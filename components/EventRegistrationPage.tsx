import React from 'react';
import { Event, User } from '../types';
import { CloseIcon, CheckCircleIcon, CalendarIcon, LocationIcon, UserIcon } from './icons';

interface EventRegistrationPageProps {
    onClose: () => void;
    event: Event;
    user: User;
    onConfirm: () => void;
}

const DetailRow: React.FC<{ icon: React.ReactNode, label: string, value: string, valueClassName?: string }> = ({ icon, label, value, valueClassName = 'text-white' }) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-teal-400 mt-1">{icon}</div>
        <div>
            <p className="text-sm font-semibold text-gray-300">{label}</p>
            <p className={`text-sm ${valueClassName}`}>{value}</p>
        </div>
    </div>
);

const EventRegistrationPage: React.FC<EventRegistrationPageProps> = ({ onClose, event, user, onConfirm }) => {
    const eventDate = new Date(event.start_time).toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    const deadlineDate = event.registration_deadline ? new Date(event.registration_deadline) : null;
    const isDeadlinePassed = deadlineDate ? deadlineDate < new Date() : false;
    const formattedDeadline = deadlineDate ? deadlineDate.toLocaleString(undefined, {
        dateStyle: 'full',
        timeStyle: 'short',
    }) : 'Not specified';


    return (
        <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
                className="bg-gray-900/80 border border-green-500/30 rounded-2xl w-full max-w-2xl shadow-2xl shadow-green-900/50 transform transition-all duration-300"
            >
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-orbitron text-white">Confirm Registration</h2>
                        <p className="text-sm text-gray-400">Review the details and confirm your spot.</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                        <CloseIcon />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Details */}
                    <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
                        <h3 className="font-bold text-lg text-teal-300 mb-2 border-b border-teal-500/20 pb-2">{event.title}</h3>
                        <DetailRow icon={<CalendarIcon/>} label="Date & Time" value={eventDate} />
                        <DetailRow icon={<LocationIcon/>} label="Location" value={`${event.venue}, ${event.location.district}`} />
                         {event.registration_deadline && (
                            <DetailRow 
                                icon={<CalendarIcon/>} 
                                label="Registration Deadline" 
                                value={formattedDeadline + (isDeadlinePassed ? ' (Closed)' : '')}
                                valueClassName={isDeadlinePassed ? 'text-red-400 font-bold' : 'text-white'}
                            />
                        )}
                    </div>

                    {/* User Details */}
                    <div className="bg-gray-800/50 p-4 rounded-lg space-y-4">
                         <h3 className="font-bold text-lg text-gray-300 mb-2 border-b border-gray-500/20 pb-2">Your Details</h3>
                         <DetailRow icon={<UserIcon/>} label="Full Name" value={user.name} />
                         <DetailRow icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>} label="Email Address" value={user.email} />
                    </div>
                </div>

                 <div className="mt-2 p-6 border-t border-gray-700/50 flex justify-end items-center gap-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        disabled={isDeadlinePassed}
                        className="flex items-center space-x-2 px-6 py-2.5 font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg shadow-green-900/50 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
                    >
                        <CheckCircleIcon />
                        <span>{isDeadlinePassed ? 'Registration Closed' : 'Confirm & Register'}</span>
                    </button>
                </div>
            </div>
             <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default EventRegistrationPage;
