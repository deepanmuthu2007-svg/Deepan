

import React from 'react';
import { Event } from '../types';
import { AddIcon, AISparkle, CalendarIcon, LocationIcon, RemoveIcon, SourceDevpost, SourceManual, SourceNovafest, SourceUnstop, SparkleIcon } from './icons';

interface EventCardProps {
    event: Event;
    onShowDetails: (event: Event) => void;
    onRegister: (event: Event) => void;
    onUnregister: (eventId: string) => void;
    isMyEvent: boolean;
    recommendationReason?: string;
}

const SourceBadge: React.FC<{ name: string }> = ({ name }) => {
    const renderIcon = () => {
        switch (name.toLowerCase()) {
            case 'devpost': return <SourceDevpost />;
            case 'novafest': return <SourceNovafest />;
            case 'unstop': return <SourceUnstop />;
            default: return <SourceManual />;
        }
    };
    return (
        <div className="flex items-center space-x-1.5 bg-gray-700/50 px-2 py-1 rounded-full text-xs font-medium text-gray-300 capitalize">
            {renderIcon()}
            <span>{name}</span>
        </div>
    );
};

const EventCard: React.FC<EventCardProps> = ({ event, onShowDetails, onRegister, onUnregister, isMyEvent, recommendationReason }) => {
    const startDate = new Date(event.start_time).toLocaleDateString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric'
    });

    const handleToggle = () => {
        if (isMyEvent) {
            onUnregister(event.event_id);
        } else {
            onRegister(event);
        }
    };

    return (
        <div className="bg-gray-800/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-900/40 transform hover:-translate-y-1">
            <div>
                {recommendationReason && (
                    <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-center">
                        <p className="text-xs font-semibold text-yellow-300 flex items-center justify-center gap-2">
                           <SparkleIcon className="w-4 h-4" /> Recommended for you
                        </p>
                    </div>
                )}
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold font-orbitron text-lg text-white leading-tight">{event.title}</h3>
                    <SourceBadge name={event.source[0]?.name || 'manual'} />
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1.5">
                        <CalendarIcon />
                        <span>{startDate}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <LocationIcon />
                        <span>{event.location.district}, {event.location.country}</span>
                    </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 h-20 overflow-hidden line-clamp-4">
                    {event.description}
                </p>

                {recommendationReason && (
                    <div className="mb-4 p-3 bg-teal-500/10 rounded-lg">
                        <p className="text-xs text-teal-300 italic">
                           "{recommendationReason}"
                        </p>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-medium text-violet-300 bg-violet-500/20 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center mt-auto border-t border-gray-700/50 pt-4">
                <button
                    onClick={() => onShowDetails(event)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-900/50"
                >
                    <AISparkle />
                    <span>Learn More</span>
                </button>
                 <button
                    onClick={handleToggle}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        isMyEvent 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                    aria-label={isMyEvent ? 'Unregister from this event' : 'Register for this event'}
                >
                    {isMyEvent ? <RemoveIcon /> : <AddIcon />}
                    <span>{isMyEvent ? 'Unregister' : 'Register'}</span>
                </button>
            </div>
        </div>
    );
};

export default EventCard;