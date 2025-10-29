import React, { useState } from 'react';
import { Event, User } from '../types';
import EventCard from './EventCard';
import { UsersIcon, AISparkle, UserIcon, SparkleIcon, CodeIcon, CloseIcon } from './icons';

interface MyEventsDashboardProps {
    user: User;
    onUpdateUser: (user: User) => void;
    myEvents: Event[];
    onShowDetails: (event: Event) => void;
    onShowRegistrations: (event: Event) => void;
    userId: string;
    onUnregister: (eventId: string) => void;
}

const MyEventsDashboard: React.FC<MyEventsDashboardProps> = ({ user, onUpdateUser, myEvents, onShowDetails, onShowRegistrations, userId, onUnregister }) => {
    const organizingEvents = myEvents.filter(e => e.organizerId === userId);
    const attendingEvents = myEvents.filter(e => e.organizerId !== userId);

    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim() && !user.skills.map(s => s.toLowerCase()).includes(newSkill.trim().toLowerCase())) {
            const updatedUser = { ...user, skills: [...user.skills, newSkill.trim()] };
            onUpdateUser(updatedUser);
            setNewSkill('');
        }
    };
    const handleRemoveSkill = (skillToRemove: string) => {
        const updatedUser = { ...user, skills: user.skills.filter(skill => skill !== skillToRemove) };
        onUpdateUser(updatedUser);
    };

    const OrganizerEventCard: React.FC<{ event: Event }> = ({ event }) => (
        <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-900/40">
            <div>
                <h3 className="font-bold font-orbitron text-lg text-white leading-tight mb-2">{event.title}</h3>
                <p className="text-sm text-gray-400 mb-4">
                    {new Date(event.start_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} &bull; {event.location.district}
                </p>
            </div>
            <div className="flex justify-end items-center mt-auto border-t border-gray-700/50 pt-4 gap-2">
                <button
                    onClick={() => onShowRegistrations(event)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                >
                    <UsersIcon />
                    <span>View Registrations</span>
                </button>
                <button
                    onClick={() => onShowDetails(event)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all transform hover:scale-105"
                >
                    <AISparkle />
                    <span>Organizer Report</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-orbitron font-bold text-white">My Dashboard</h1>
                <p className="mt-2 text-gray-400">An overview of your event activities and profile.</p>
            </div>

            <section>
                 <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 space-y-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold font-orbitron text-violet-400 mb-2 flex items-center gap-3">
                                <UserIcon className="w-6 h-6"/>
                                Profile Overview
                            </h2>
                            <p className="text-gray-400 text-lg font-semibold">{user.name}</p>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold text-teal-400 mb-3 flex items-center gap-2">
                            <SparkleIcon className="w-5 h-5" />
                            Interests
                        </h3>
                         <div className="flex flex-wrap gap-2">
                            {user.interests.map(interest => (
                                <span key={interest} className="px-3 py-1 text-sm font-medium text-teal-300 bg-teal-500/20 rounded-full capitalize">{interest}</span>
                            ))}
                        </div>
                    </div>

                     <div>
                        <h3 className="font-semibold text-teal-400 mb-3 flex items-center gap-2">
                            <CodeIcon className="w-5 h-5" />
                            Skills
                        </h3>
                         <div className="flex flex-wrap gap-2 mb-4">
                            {user.skills.map(skill => (
                                <span key={skill} className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-teal-300 bg-teal-500/20 rounded-full">
                                    {skill}
                                    <button onClick={() => handleRemoveSkill(skill)} className="text-teal-500 hover:text-red-400 transition-colors">
                                        <CloseIcon className="w-4 h-4"/>
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2 max-w-sm">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleAddSkill(); }}
                                placeholder="Add a new skill"
                                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white placeholder-gray-500"
                            />
                            <button 
                                onClick={handleAddSkill}
                                className="px-4 py-2 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!newSkill.trim()}
                            >
                                Add
                            </button>
                        </div>
                    </div>

                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold font-orbitron text-violet-400 mb-6">Events I'm Organizing</h2>
                {organizingEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {organizingEvents.map(event => (
                            <OrganizerEventCard key={event.event_id} event={event} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8 bg-gray-800/30 rounded-lg">You are not organizing any events.</p>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold font-orbitron text-teal-400 mb-6">Events I'm Attending</h2>
                {attendingEvents.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {attendingEvents.map(event => (
                            <EventCard 
                                key={event.event_id}
                                event={event}
                                onShowDetails={onShowDetails}
                                onRegister={() => {}}
                                onUnregister={onUnregister}
                                isMyEvent={true}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-8 bg-gray-800/30 rounded-lg">You have not added any events to your dashboard yet.</p>
                )}
            </section>
        </div>
    );
};

export default MyEventsDashboard;