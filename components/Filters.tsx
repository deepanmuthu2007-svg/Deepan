import React, { useMemo } from 'react';

interface FiltersProps {
  locations: { [country: string]: { [state: string]: string[] } };
  country: string;
  setCountry: (country: string) => void;
  state: string;
  setState: (state: string) => void;
  district: string;
  setDistrict: (district: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

const Selector: React.FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  label: string;
  disabled?: boolean;
}> = ({ value, onChange, options, label, disabled }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full pl-3 pr-10 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white disabled:opacity-50"
    >
      <option value="all">All {label}</option>
      {options.map(opt => <option key={opt} value={opt} className="capitalize">{opt}</option>)}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
    </div>
  </div>
);

const Filters: React.FC<FiltersProps> = ({
  locations,
  country, setCountry,
  state, setState,
  district, setDistrict,
  searchTerm, setSearchTerm,
  category, setCategory
}) => {
  const countries = useMemo(() => Object.keys(locations).sort(), [locations]);
  const states = useMemo(() => country !== 'all' ? Object.keys(locations[country] || {}).sort() : [], [locations, country]);
  const districts = useMemo(() => (country !== 'all' && state !== 'all') ? (locations[country]?.[state] || []).sort() : [], [locations, country, state]);
  const categories = [
    'technical', 
    'non-technical',
    'coding', 
    'hackathon',
    'workshop',
    'conference', 
    'music',
    'dance',
    'paper presentation',
    'soft skill',
    'ai',
    'aptitude test', 
    'logical thinking'
  ];

  return (
    <div className="mb-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative md:col-span-2 lg:col-span-1">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        <Selector
          label="Categories"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categories}
        />
        <Selector
          label="Countries"
          value={country}
          onChange={(e) => { setCountry(e.target.value); setState('all'); setDistrict('all'); }}
          options={countries}
        />
        <Selector
          label="States"
          value={state}
          onChange={(e) => { setState(e.target.value); setDistrict('all'); }}
          options={states}
          disabled={country === 'all'}
        />
        <Selector
          label="Districts"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          options={districts}
          disabled={state === 'all'}
        />
      </div>
    </div>
  );
};

export default Filters;