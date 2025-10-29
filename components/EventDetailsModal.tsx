import React, { useMemo } from 'react';
import { Event, Summary, OrganizerReport, ReminderSetting } from '../types';
import { AISparkle, BulletIcon, CheckIcon, CloseIcon, ConfidenceIcon, ErrorIcon, LoadingIcon, SparkleIcon, UsersIcon, CalendarIcon, LocationIcon, TrophyIcon, LinkIcon, BellIcon } from './icons';

interface EventDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
    summary: Summary | OrganizerReport | null;
    isGenerating: boolean;
    error: string | null;
    isOrganizerReport: boolean;
    onGenerateSummary: () => void;
    isMyEvent: boolean;
    reminder: ReminderSetting;
    onSetReminder: (reminder: ReminderSetting) => void;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2">
        <div className="flex-shrink-0 text-teal-400">{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-sm font-medium text-white">{value}</p>
        </div>
    </div>
);

const ReminderButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 border ${
            isActive
                ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
        }`}
    >
        {label}
    </button>
);

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event, summary, isGenerating, error, isOrganizerReport, onGenerateSummary, isMyEvent, reminder, onSetReminder }) => {
    
    const mapSrc = useMemo(() => {
        const locationQuery = `${event.location.district}, ${event.location.state}, ${event.location.country}`;
        return `https://www.google.com/maps?q=${encodeURIComponent(locationQuery)}&output=embed`;
    }, [event.location]);

    if (!isOpen) return null;

    const report = summary as OrganizerReport;
    const eventDate = new Date(event.start_time).toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gray-900/80 border border-teal-500/30 rounded-2xl w-full max-w-3xl shadow-2xl shadow-teal-900/50 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-orbitron text-white">{event.title}</h2>
                        <p className="text-sm text-gray-400">
                           {isOrganizerReport ? "Organizer Report" : "Event Details"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                        <CloseIcon />
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                    {/* Event Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-800/30 p-4 rounded-lg">
                        <DetailItem icon={<CalendarIcon/>} label="Date & Time" value={eventDate} />
                        <DetailItem icon={<LocationIcon/>} label="Location" value={`${event.venue}, ${event.location.district}`} />
                    </div>
                    
                    {/* Map Section */}
                     <div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Event Location</h3>
                        <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={mapSrc}
                            ></iframe>
                        </div>
                    </div>


                    {/* Description Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Description</h3>
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{event.description}</p>
                    </div>

                    {/* Reminder Section */}
                    {isMyEvent && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2 flex items-center gap-2"><BellIcon className="w-5 h-5 text-teal-400"/>Set a Reminder</h3>
                            <div className="flex items-center space-x-2">
                                <ReminderButton label="1 Hour Before" isActive={reminder === '1h'} onClick={() => onSetReminder('1h')} />
                                <ReminderButton label="1 Day Before" isActive={reminder === '1d'} onClick={() => onSetReminder('1d')} />
                                {reminder && (
                                    <button onClick={() => onSetReminder(null)} className="text-sm text-gray-400 hover:text-red-400 transition-colors px-2">
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Awards Section */}
                    {(event.awards && event.awards.length > 0) && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2 flex items-center gap-2"><TrophyIcon className="w-5 h-5 text-yellow-400"/>Awards</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                                {event.awards.map((award, i) => <li key={i}>{award}</li>)}
                            </ul>
                        </div>
                    )}

                    {/* Project Links Section */}
                    {(event.project_links && event.project_links.length > 0) && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-2 flex items-center gap-2"><LinkIcon className="w-5 h-5 text-blue-400"/>Project Links</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                {event.project_links.map((link, i) => <li key={i}><a href={link} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline break-all">{link}</a></li>)}
                            </ul>
                        </div>
                    )}

                    {/* AI Summary Section */}
                    <div className="pt-6 border-t border-gray-700/50 space-y-4">
                        <h3 className="text-lg font-semibold text-teal-400 flex items-center gap-2">
                           <AISparkle/> {isOrganizerReport ? 'AI Organizer Report' : 'AI-Powered Summary'}
                        </h3>
                        
                        {isGenerating && (
                            <div className="flex flex-col items-center justify-center h-40 text-center text-gray-300 bg-gray-800/50 rounded-lg">
                                <LoadingIcon className="w-10 h-10 text-teal-400" />
                                <p className="mt-3 font-medium">Generating with Gemini...</p>
                            </div>
                        )}
                        {error && (
                            <div className="flex flex-col items-center justify-center h-40 text-center text-red-400 bg-red-500/10 p-4 rounded-lg">
                                <ErrorIcon className="w-10 h-10" />
                                <p className="mt-3 font-medium">An Error Occurred</p>
                                <p className="text-sm text-gray-300">{error}</p>
                            </div>
                        )}
                        {summary && !isGenerating && (
                            <div className="space-y-6 animate-fade-in">
                                {isOrganizerReport && (
                                     <div className="space-y-4">
                                        {report.attendance_rate && (
                                            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                                <h4 className="font-semibold text-violet-400 mb-1 text-xs flex items-center gap-2"><UsersIcon className="w-4 h-4" />Attendance Rate</h4>
                                                <p className="text-xl font-orbitron text-white">{report.attendance_rate}</p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {report.winner_summary && (
                                                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                                    <h4 className="font-semibold text-violet-400 mb-1 text-xs flex items-center gap-2"><SparkleIcon />Winner Summary</h4>
                                                    <p className="text-gray-200 text-sm">{report.winner_summary}</p>
                                                </div>
                                            )}
                                            {report.notable_submissions && (
                                                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                                    <h4 className="font-semibold text-violet-400 mb-1 text-xs flex items-center gap-2"><LinkIcon className="w-4 h-4" />Notable Submissions</h4>
                                                    <p className="text-gray-200 text-sm">{report.notable_submissions}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-semibold text-gray-300 mb-2">Summary</h4>
                                    <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-teal-400">
                                        <p className="text-gray-200 text-sm italic">"{summary.summary_short}"</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-violet-400 mb-3 flex items-center gap-2"><SparkleIcon />Key Highlights</h4>
                                    <ul className="space-y-2 text-sm">
                                        {summary.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start">
                                                <BulletIcon className="w-5 h-5 text-violet-400 mt-0.5 mr-2 flex-shrink-0" />
                                                <span className="text-gray-300">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex justify-end items-center space-x-2 pt-4 text-sm border-t border-gray-700/50">
                                    <ConfidenceIcon />
                                    <span className="text-gray-400">AI Confidence:</span>
                                    <span className="font-bold text-white bg-teal-500/20 px-2.5 py-1 rounded-md text-base">{ (summary.confidence * 100).toFixed(0) }%</span>
                                </div>
                            </div>
                        )}
                         {!summary && !isGenerating && !error && (
                            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                                <p className="text-gray-400 mb-3">Get a quick overview of this event.</p>
                                <button
                                    onClick={onGenerateSummary}
                                    className="flex items-center justify-center mx-auto space-x-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-900/50"
                                >
                                    <AISparkle />
                                    <span>Generate AI Summary</span>
                                </button>
                            </div>
                         )}
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale { animation: fadeInScale 0.3s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default EventDetailsModal;