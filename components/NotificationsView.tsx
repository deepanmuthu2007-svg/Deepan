import React from 'react';
import { Notification } from '../types';
import { BellIcon, CheckIcon, TrophyIcon } from './icons';

interface NotificationsViewProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
}

const NotificationCard: React.FC<{ notification: Notification, onMarkAsRead: (id: string) => void }> = ({ notification, onMarkAsRead }) => {
    
    const getIcon = () => {
        if (notification.message.toLowerCase().includes('congratulations')) {
            return <div className="p-2 bg-yellow-500/20 text-yellow-400 rounded-full"><TrophyIcon className="w-5 h-5"/></div>;
        }
        if (notification.message.toLowerCase().includes('thank you')) {
            return <div className="p-2 bg-green-500/20 text-green-400 rounded-full"><CheckIcon className="w-5 h-5"/></div>;
        }
        return <div className="p-2 bg-gray-600/50 text-gray-300 rounded-full"><BellIcon className="w-5 h-5"/></div>;
    }

    return (
        <div className={`p-4 rounded-lg border flex items-start gap-4 transition-all duration-300 ${notification.read ? 'bg-gray-800/30 border-gray-700/50 opacity-60' : 'bg-gray-800/70 border-gray-700'}`}>
            <div className="flex-shrink-0 mt-1">
                {getIcon()}
            </div>
            <div className="flex-grow">
                <p className={`font-semibold ${notification.read ? 'text-gray-400' : 'text-white'}`}>{notification.eventTitle}</p>
                <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-300'}`}>{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
            </div>
            {!notification.read && (
                 <button onClick={() => onMarkAsRead(notification.id)} className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex-shrink-0">Mark as read</button>
            )}
        </div>
    );
};

const NotificationsView: React.FC<NotificationsViewProps> = ({ notifications, onMarkAsRead }) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    const readCount = notifications.length - unreadCount;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                <h1 className="text-4xl font-orbitron font-bold text-white">Notifications</h1>
                <p className="mt-2 text-gray-400">You have {unreadCount} unread message{unreadCount !== 1 && 's'}.</p>
            </div>
            <div className="space-y-4">
                {notifications.length > 0 ? (
                    <>
                        {unreadCount > 0 && notifications.filter(n => !n.read).map(n => <NotificationCard key={n.id} notification={n} onMarkAsRead={onMarkAsRead} />)}
                        {readCount > 0 && unreadCount > 0 && <div className="text-center text-gray-500 text-sm py-2">-- Read Messages --</div>}
                        {readCount > 0 && notifications.filter(n => n.read).map(n => <NotificationCard key={n.id} notification={n} onMarkAsRead={onMarkAsRead} />)}
                    </>
                ) : (
                    <div className="text-center py-20 bg-gray-800/30 rounded-lg">
                        <BellIcon className="w-16 h-16 mx-auto text-gray-600" />
                        <p className="mt-4 text-gray-400">You have no notifications yet.</p>
                        <p className="text-sm text-gray-500">Notifications from your events will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsView;
