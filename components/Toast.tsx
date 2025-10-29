import React, { useEffect } from 'react';
import { CheckCircleIcon } from './icons';

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-close after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <>
            <div className="fixed bottom-5 right-5 z-[100] bg-teal-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-2xl shadow-teal-900/50 flex items-center space-x-3 transform transition-all duration-300 animate-slide-in-out">
                <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
                <span className="font-semibold">{message}</span>
            </div>
            <style>{`
                @keyframes slideInOut {
                    0% { transform: translateX(110%); opacity: 0; }
                    15% { transform: translateX(0); opacity: 1; }
                    85% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(110%); opacity: 0; }
                }
                .animate-slide-in-out {
                    animation: slideInOut 3.2s ease-in-out forwards;
                }
            `}</style>
        </>
    );
};

export default Toast;
