import React, { useState, useMemo } from 'react';
import { Event, Location } from '../types';
import { CloseIcon, HostIcon } from './icons';

interface HostEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHostEvent: (eventData: Omit<Event, 'event_id' | 'source' | 'organizerId'>) => void;
    locations: { [country: string]: { [state: string]: string[] } };
}

const HostEventModal: React.FC<HostEventModalProps> = ({ isOpen, onClose, onHostEvent, locations }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [venue, setVenue] = useState('');
    const [country, setCountry] = useState('USA');
    const [state, setState] = useState('California');
    const [district, setDistrict] = useState('San Francisco');

    const countries = useMemo(() => Object.keys(locations).sort(), [locations]);
    const states = useMemo(() => Object.keys(locations[country] || {}).sort(), [locations, country]);
    const districts = useMemo(() => (locations[country]?.[state] || []).sort(), [locations, country, state]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventData = {
            title,
            description,
            tags: tags.split(',').map(t => t.trim()),
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            location: { country, state, district },
            participants_count: 0,
            registration_url: '#',
            venue,
            awards: null,
            project_links: null,
            participants: [],
        };
        onHostEvent(eventData);
    };

    if (!isOpen) return null;

    const InputField: React.FC<{label: string, value: string, onChange: (val: string) => void, type?: string, required?: boolean, placeholder?: string}> = ({label, value, onChange, type="text", required=true, placeholder}) => (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input 
                type={type} 
                value={value} 
                onChange={e => onChange(e.target.value)} 
                required={required}
                placeholder={placeholder}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white"
            />
        </div>
    );

    const SelectField: React.FC<{label: string, value: string, onChange: (val: string) => void, options: string[]}> = ({ label, value, onChange, options }) => (
        <div>
             <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
             <select value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white">
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
             </select>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-gray-900/80 border border-violet-500/30 rounded-2xl w-full max-w-2xl shadow-2xl shadow-violet-900/50 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-orbitron text-white">Host a New Event</h2>
                        <p className="text-sm text-gray-400">Fill out the details to create your event</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2"><InputField label="Event Title" value={title} onChange={setTitle} /></div>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                             <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white"></textarea>
                        </div>
                        <InputField label="Tags (comma-separated)" value={tags} onChange={setTags} placeholder="e.g. coding, hackathon, ai" />
                        <InputField label="Venue" value={venue} onChange={setVenue} />
                        <InputField label="Start Time" value={startTime} onChange={setStartTime} type="datetime-local" />
                        <InputField label="End Time" value={endTime} onChange={setEndTime} type="datetime-local" />
                        <SelectField label="Country" value={country} onChange={val => { setCountry(val); setState(Object.keys(locations[val])[0]); setDistrict(locations[val][Object.keys(locations[val])[0]][0]); }} options={countries} />
                        <SelectField label="State" value={state} onChange={val => { setState(val); setDistrict(locations[country][val][0]); }} options={states} />
                        <SelectField label="District" value={district} onChange={setDistrict} options={districts} />
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-end">
                        <button type="submit" className="flex items-center space-x-2 px-6 py-2.5 font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all transform hover:scale-105 shadow-lg shadow-violet-900/50">
                            <HostIcon />
                            <span>Create Event</span>
                        </button>
                    </div>
                </form>
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

export default HostEventModal;
