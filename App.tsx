import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import EventCard from './components/EventCard';
import MyEventsDashboard from './components/MyEventsDashboard';
import EventDetailsModal from './components/EventDetailsModal';
import HostEventModal from './components/HostEventModal';
import ViewRegistrationsModal from './components/ViewRegistrationsModal';
import RecommendationsView from './components/RecommendationsView';
import { AccountSync } from './components/AccountSync';
import NotificationsView from './components/NotificationsView';
import Toast from './components/Toast';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import EventRegistrationPage from './components/EventRegistrationPage';
import { useMockData } from './hooks/useMockData';
import { generateEventSummary, generateRecommendations } from './services/geminiService';
import { View, Event, Summary, OrganizerReport, ReminderSetting, Notification, User, Recommendation } from './types';
import { allLocations } from './data/locations';
import { SparkleIcon } from './components/icons';

const USER_ID = 'user-123'; // A mock user ID

const App: React.FC = () => {
    const { user: mockUser, events: initialEvents, connectedAccounts, notifications: initialNotifications } = useMockData();
    
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'signup'>('login');

    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [user, setUser] = useState<User>(mockUser);
    const [currentView, setCurrentView] = useState<View>(View.DISCOVER);
    const [myEventIds, setMyEventIds] = useState<Set<string>>(() => new Set(['event-1', 'event-4']));
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    // Discover page state
    const [discoverTab, setDiscoverTab] = useState<'all' | 'recommended'>('all');

    // Filters state
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [country, setCountry] = useState('all');
    const [state, setState] = useState('all');
    const [district, setDistrict] = useState('all');

    // Modal and Page states
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventForRegistration, setEventForRegistration] = useState<Event | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isHostModalOpen, setIsHostModalOpen] = useState(false);
    const [isRegistrationsModalOpen, setIsRegistrationsModalOpen] = useState(false);
    const [isRegistrationPageOpen, setIsRegistrationPageOpen] = useState(false);

    // AI State
    const [summary, setSummary] = useState<Summary | OrganizerReport | null>(null);
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [summaryError, setSummaryError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isGeneratingRecs, setIsGeneratingRecs] = useState(false);
    const [recsError, setRecsError] = useState<string | null>(null);

    const [toast, setToast] = useState<{ message: string } | null>(null);

    // Reminders State
    const [reminders, setReminders] = useState<Record<string, ReminderSetting>>({});

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || event.tags.includes(category);
            const matchesCountry = country === 'all' || event.location.country === country;
            const matchesState = state === 'all' || event.location.state === state;
            const matchesDistrict = district === 'all' || event.location.district === district;
            return matchesSearch && matchesCategory && matchesCountry && matchesState && matchesDistrict;
        });
    }, [events, searchTerm, category, country, state, district]);

    const myEvents = useMemo(() => events.filter(e => myEventIds.has(e.event_id)), [events, myEventIds]);
    const notificationCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

    const handleRegisterForEvent = useCallback((event: Event) => {
        setEventForRegistration(event);
        setIsRegistrationPageOpen(true);
    }, []);

    const handleConfirmRegistration = useCallback(() => {
        if (!eventForRegistration) return;
        setMyEventIds(prev => {
            const newSet = new Set(prev);
            newSet.add(eventForRegistration.event_id);
            return newSet;
        });
        setIsRegistrationPageOpen(false);
        setToast({ message: `Successfully registered for ${eventForRegistration.title}` });
        // Delay clearing to prevent flickering during page transition
        setTimeout(() => setEventForRegistration(null), 300); 
    }, [eventForRegistration]);
    
    const handleUnregisterFromEvent = useCallback((eventId: string) => {
        setMyEventIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(eventId);
            return newSet;
        });
    }, []);

    const handleShowDetails = useCallback((event: Event) => {
        setSelectedEvent(event);
        setIsDetailsModalOpen(true);
        setSummary(null);
        setSummaryError(null);
    }, []);
    
    const handleCloseDetails = useCallback(() => {
        setIsDetailsModalOpen(false);
        setSelectedEvent(null);
    }, []);

    const handleGenerateSummary = useCallback(async () => {
        if (!selectedEvent) return;
        setIsGeneratingSummary(true);
        setSummaryError(null);
        setSummary(null);
        try {
            const isOrganizer = selectedEvent.organizerId === USER_ID;
            const result = await generateEventSummary(selectedEvent, isOrganizer);
            setSummary(result);
        } catch (err) {
            setSummaryError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsGeneratingSummary(false);
        }
    }, [selectedEvent]);

    const handleGenerateRecommendations = useCallback(async () => {
        // Avoid re-fetching if we already have recommendations
        if (recommendations.length > 0) return;

        setIsGeneratingRecs(true);
        setRecsError(null);
        try {
            // We'll pass events that the user is not already part of
            const candidateEvents = events.filter(e => !myEventIds.has(e.event_id));
            const result = await generateRecommendations(user, candidateEvents);
            setRecommendations(result);
        } catch (err) {
            setRecsError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsGeneratingRecs(false);
        }
    }, [user, events, recommendations.length, myEventIds]);


    const handleHostEvent = useCallback((eventData: Omit<Event, 'event_id' | 'source' | 'organizerId'>) => {
        const newEvent: Event = {
            ...eventData,
            event_id: `event-${Date.now()}`,
            source: [{ name: 'Manual Entry', url: '#' }],
            organizerId: USER_ID,
        };
        setEvents(prev => [newEvent, ...prev]);
        setMyEventIds(prev => new Set(prev).add(newEvent.event_id));
        setIsHostModalOpen(false);
    }, []);

    const handleSetReminder = useCallback((reminder: ReminderSetting) => {
        if (selectedEvent) {
            setReminders(prev => ({...prev, [selectedEvent.event_id]: reminder}));
            let toastMessage = '';
            if (reminder === '1h') toastMessage = 'Reminder set for 1 hour before.';
            else if (reminder === '1d') toastMessage = 'Reminder set for 1 day before.';
            else toastMessage = 'Reminder cleared.';
            
            setToast({ message: toastMessage });
        }
    }, [selectedEvent]);
    
    const handleMarkAsRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n));
    }, []);

    // Auth Handlers
    const handleLogin = () => {
        setIsAuthenticated(true);
        setCurrentView(View.DISCOVER);
    };
    const handleSignUp = () => {
        setIsAuthenticated(true);
        setCurrentView(View.DISCOVER);
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        setAuthView('login');
    };

    const DiscoverTabButton: React.FC<{ label: string; active: boolean; onClick: () => void; icon?: React.ReactNode;}> = ({ label, active, onClick, icon }) => (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
                active 
                ? 'border-teal-400 text-teal-400' 
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
            }`}
        >
            {icon}
            {label}
        </button>
    );

    const renderContent = () => {
        switch (currentView) {
            case View.MY_EVENTS:
                return <MyEventsDashboard 
                            user={user}
                            onUpdateUser={setUser}
                            myEvents={myEvents} 
                            onShowDetails={handleShowDetails} 
                            onShowRegistrations={(e) => { setSelectedEvent(e); setIsRegistrationsModalOpen(true); }}
                            userId={USER_ID}
                            onUnregister={handleUnregisterFromEvent}
                       />;
            case View.ACCOUNT_SYNC:
                return <AccountSync connectedAccounts={connectedAccounts} />;
            case View.NOTIFICATIONS:
                return <NotificationsView notifications={notifications} onMarkAsRead={handleMarkAsRead} />;
            case View.DISCOVER:
            default:
                return (
                    <>
                        <div className="mb-6 flex justify-center border-b border-gray-700/50">
                            <DiscoverTabButton label="All Events" active={discoverTab === 'all'} onClick={() => setDiscoverTab('all')} />
                            <DiscoverTabButton 
                                label="For You" 
                                active={discoverTab === 'recommended'} 
                                onClick={() => {
                                    setDiscoverTab('recommended');
                                    handleGenerateRecommendations();
                                }}
                                icon={<SparkleIcon className="w-5 h-5" />}
                            />
                        </div>

                        {discoverTab === 'all' && (
                            <>
                                <Filters
                                    locations={allLocations}
                                    country={country} setCountry={setCountry}
                                    state={state} setState={setState}
                                    district={district} setDistrict={setDistrict}
                                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                    category={category} setCategory={setCategory}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredEvents.map(event => (
                                        <EventCard
                                            key={event.event_id}
                                            event={event}
                                            onShowDetails={handleShowDetails}
                                            onRegister={() => handleRegisterForEvent(event)}
                                            onUnregister={() => handleUnregisterFromEvent(event.event_id)}
                                            isMyEvent={myEventIds.has(event.event_id)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        {discoverTab === 'recommended' && (
                             <RecommendationsView
                                recommendations={recommendations}
                                allEvents={events}
                                isLoading={isGeneratingRecs}
                                error={recsError}
                                onShowDetails={handleShowDetails}
                                onRegister={handleRegisterForEvent}
                                onUnregister={handleUnregisterFromEvent}
                                myEventIds={myEventIds}
                            />
                        )}
                    </>
                );
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                 {authView === 'login' ? (
                    <LoginPage onLogin={handleLogin} onSwitchToSignUp={() => setAuthView('signup')} />
                 ) : (
                    <SignUpPage onSignUp={handleSignUp} onSwitchToLogin={() => setAuthView('login')} />
                 )}
            </div>
        );
    }
    
    if (isRegistrationPageOpen && eventForRegistration) {
        return (
            <EventRegistrationPage 
                event={eventForRegistration}
                user={user}
                onConfirm={handleConfirmRegistration}
                onClose={() => setIsRegistrationPageOpen(false)}
            />
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header
                currentView={currentView}
                setCurrentView={setCurrentView}
                onHostEventClick={() => setIsHostModalOpen(true)}
                notificationCount={notificationCount}
                onLogout={handleLogout}
            />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
            
            {selectedEvent && isDetailsModalOpen && (
                 <EventDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={handleCloseDetails}
                    event={selectedEvent}
                    summary={summary}
                    isGenerating={isGeneratingSummary}
                    error={summaryError}
                    isOrganizerReport={selectedEvent.organizerId === USER_ID}
                    onGenerateSummary={handleGenerateSummary}
                    isMyEvent={myEventIds.has(selectedEvent.event_id)}
                    reminder={reminders[selectedEvent.event_id] || null}
                    onSetReminder={handleSetReminder}
                />
            )}

            <HostEventModal
                isOpen={isHostModalOpen}
                onClose={() => setIsHostModalOpen(false)}
                onHostEvent={handleHostEvent}
                locations={allLocations}
            />

            {selectedEvent && isRegistrationsModalOpen && (
                 <ViewRegistrationsModal
                    isOpen={isRegistrationsModalOpen}
                    onClose={() => setIsRegistrationsModalOpen(false)}
                    event={selectedEvent}
                />
            )}
            
            {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
        </div>
    );
};

export default App;