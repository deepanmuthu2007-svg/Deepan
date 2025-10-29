import React from 'react';
import { Event, Participant } from '../types';
import { CloseIcon, UsersIcon } from './icons';

interface ViewRegistrationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
}

const statusStyles = {
    registered: 'bg-gray-500/20 text-gray-300',
    attended: 'bg-blue-500/20 text-blue-300',
    winner: 'bg-yellow-500/20 text-yellow-300',
    'runner-up': 'bg-gray-300/20 text-gray-200',
    'third-place': 'bg-orange-500/20 text-orange-300',
}


const ParticipantRow: React.FC<{participant: Participant}> = ({ participant }) => (
    <div className="p-3 bg-gray-800/50 rounded-lg flex justify-between items-center">
        <span className="font-medium text-white">{participant.name}</span>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${statusStyles[participant.status]}`}>
            {participant.status.replace('-', ' ')}
        </span>
    </div>
);


const ViewRegistrationsModal: React.FC<ViewRegistrationsModalProps> = ({ isOpen, onClose, event }) => {
    if (!isOpen) return null;

    const participants = event.participants || [];

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gray-900/80 border border-teal-500/30 rounded-2xl w-full max-w-md shadow-2xl shadow-teal-900/50 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-orbitron text-white">Registrations</h2>
                        <p className="text-sm text-gray-400">{event.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                        <CloseIcon />
                    </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {participants.length > 0 ? (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-400 mb-4">
                               Showing {participants.length} participant(s).
                            </p>
                            {participants.map(p => <ParticipantRow key={p.userId} participant={p} />)}
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500">
                            <UsersIcon className="w-12 h-12" />
                            <p className="mt-4 font-medium">No participants found</p>
                            <p className="text-sm">No one has registered for this event yet.</p>
                        </div>
                    )}
                </div>
            </div>
             <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale { animation: fadeInScale 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ViewRegistrationsModal;