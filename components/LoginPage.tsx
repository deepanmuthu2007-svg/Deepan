import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: () => void;
    onSwitchToSignUp: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd validate credentials here
        console.log('Logging in with:', { email, password });
        onLogin();
    };

    return (
        <div className="bg-gray-900/50 border border-teal-500/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-teal-900/40 w-full max-w-md transform transition-all duration-500 animate-fade-in-scale">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-orbitron text-white tracking-widest">
                    EVENT<span className="text-teal-400">TRACK</span>
                </h1>
                <p className="text-gray-400 mt-2">Welcome back, event explorer.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white placeholder-gray-500"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center items-center space-x-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg shadow-teal-900/50">
                        <span>Login</span>
                    </button>
                </div>
            </form>
            <p className="text-center text-sm text-gray-400 mt-8">
                Don't have an account?{' '}
                <button onClick={onSwitchToSignUp} className="font-semibold text-teal-400 hover:underline">
                    Sign Up
                </button>
            </p>
             <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale { animation: fadeInScale 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default LoginPage;