import React from 'react';
import { View } from '../types';
import { DiscoverIcon, EventsIcon, SyncIcon, HostIcon, BellIcon } from './icons';

interface HeaderProps {
    currentView: View;
    setCurrentView: (view: View) => void;
    onHostEventClick: () => void;
    notificationCount: number;
    onLogout: () => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
    isButton?: boolean;
    isDanger?: boolean;
    badge?: number;
}> = ({ label, icon, isActive, onClick, isButton = false, isDanger = false, badge = 0 }) => (
    <button
        onClick={onClick}
        className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            isActive
                ? 'bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-500/10 border border-teal-500/30'
                : isButton
                ? 'bg-teal-500 text-white hover:bg-teal-600'
                : isDanger
                ? 'text-gray-400 hover:bg-red-500/20 hover:text-red-400'
                : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
        }`}
    >
        {icon}
        <span className="font-medium tracking-wider">{label}</span>
        {badge > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-gray-900">
                {badge}
            </span>
        )}
    </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onHostEventClick, notificationCount, onLogout }) => {
    return (
        <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h1 className="text-2xl font-bold font-orbitron text-white tracking-widest">
                            EVENT<span className="text-teal-400">TRACK</span>
                        </h1>
                    </div>
                    <nav className="hidden md:flex items-center space-x-2">
                        <NavItem
                            label="Discover"
                            icon={<DiscoverIcon />}
                            isActive={currentView === View.DISCOVER}
                            onClick={() => setCurrentView(View.DISCOVER)}
                        />
                        <NavItem
                            label="My Dashboard"
                            icon={<EventsIcon />}
                            isActive={currentView === View.MY_EVENTS}
                            onClick={() => setCurrentView(View.MY_EVENTS)}
                        />
                        <NavItem
                            label="Account Sync"
                            icon={<SyncIcon />}
                            isActive={currentView === View.ACCOUNT_SYNC}
                            onClick={() => setCurrentView(View.ACCOUNT_SYNC)}
                        />
                         <NavItem
                            label="Notifications"
                            icon={<BellIcon />}
                            isActive={currentView === View.NOTIFICATIONS}
                            onClick={() => setCurrentView(View.NOTIFICATIONS)}
                            badge={notificationCount}
                        />
                        <div className="pl-2">
                           <NavItem
                                label="Host Event"
                                icon={<HostIcon />}
                                isActive={false}
                                onClick={onHostEventClick}
                                isButton={true}
                            />
                        </div>
                         <div className="pl-2 border-l border-gray-700 ml-2">
                           <NavItem
                                label="Logout"
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>}
                                isActive={false}
                                onClick={onLogout}
                                isDanger={true}
                            />
                        </div>
                    </nav>
                </div>
            </div>
             {/* Mobile Navigation */}
             <div className="md:hidden grid grid-cols-5 gap-1 p-1 bg-gray-900/80 border-t border-gray-700/50">
                 <NavItem
                    label="Discover"
                    icon={<DiscoverIcon />}
                    isActive={currentView === View.DISCOVER}
                    onClick={() => setCurrentView(View.DISCOVER)}
                />
                <NavItem
                    label="Dashboard"
                    icon={<EventsIcon />}
                    isActive={currentView === View.MY_EVENTS}
                    onClick={() => setCurrentView(View.MY_EVENTS)}
                />
                <NavItem
                    label="Sync"
                    icon={<SyncIcon />}
                    isActive={currentView === View.ACCOUNT_SYNC}
                    onClick={() => setCurrentView(View.ACCOUNT_SYNC)}
                />
                 <NavItem
                    label="Alerts"
                    icon={<BellIcon />}
                    isActive={currentView === View.NOTIFICATIONS}
                    onClick={() => setCurrentView(View.NOTIFICATIONS)}
                    badge={notificationCount}
                />
                 <NavItem
                    label="Host"
                    icon={<HostIcon />}
                    isActive={false}
                    onClick={onHostEventClick}
                />
            </div>
        </header>
    );
};

export default Header;