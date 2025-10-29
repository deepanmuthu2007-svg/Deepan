import React from 'react';
import { Recommendation, Event } from '../types';
import EventCard from './EventCard';
import { LoadingIcon, ErrorIcon, SparkleIcon } from './icons';

interface RecommendationsViewProps {
    recommendations: Recommendation[];
    allEvents: Event[];
    isLoading: boolean;
    error: string | null;
    onShowDetails: (event: Event) => void;
    onRegister: (event: Event) => void;
    onUnregister: (eventId: string) => void;
    myEventIds: Set<string>;
}

const RecommendationsView: React.FC<RecommendationsViewProps> = ({
    recommendations,
    allEvents,
    isLoading,
    error,
    onShowDetails,
    onRegister,
    onUnregister,
    myEventIds
}) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center text-gray-300 bg-gray-800/30 rounded-lg">
                <LoadingIcon className="w-12 h-12 text-teal-400" />
                <p className="mt-4 font-medium text-lg">Generating personalized recommendations...</p>
                <p className="text-sm text-gray-400">Our AI is analyzing events just for you.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center text-red-400 bg-red-500/10 p-4 rounded-lg">
                <ErrorIcon className="w-12 h-12" />
                <p className="mt-4 font-medium text-lg">Could Not Generate Recommendations</p>
                <p className="text-sm text-gray-300">{error}</p>
            </div>
        );
    }
    
    // Create a map for quick event lookup
    const eventsMap = new Map(allEvents.map(event => [event.event_id, event]));
    
    const recommendedEvents = recommendations
        .map(rec => ({
            ...rec,
            event: eventsMap.get(rec.event_id)
        }))
        .filter(item => item.event); // Filter out any recommendations for which we couldn't find event details

    if (recommendedEvents.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center h-64 text-center text-gray-400 bg-gray-800/30 rounded-lg">
                <SparkleIcon className="w-12 h-12 text-gray-600" />
                <p className="mt-4 font-medium text-lg">No Recommendations Yet</p>
                <p className="text-sm text-gray-500">We couldn't find any specific recommendations for you at the moment.</p>
            </div>
        );
    }
    
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedEvents.map(({ event, why }) => (
                <EventCard
                    key={event!.event_id}
                    event={event!}
                    onShowDetails={onShowDetails}
                    onRegister={onRegister}
                    onUnregister={onUnregister}
                    isMyEvent={myEventIds.has(event!.event_id)}
                    recommendationReason={why}
                />
            ))}
        </div>
    );
};

export default RecommendationsView;