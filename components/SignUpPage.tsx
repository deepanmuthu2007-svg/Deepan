import React, { useState } from 'react';

interface SignUpPageProps {
    onSignUp: () => void;
    onSwitchToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd create the user here
        console.log('Signing up with:', { name, email, password });
        onSignUp();
    };

    return (
        <div className="bg-gray-900/50 border border-violet-500/20 rounded-2xl p-8 md:p-12 shadow-2xl shadow-violet-900/40 w-full max-w-md transform transition-all duration-500 animate-fade-in-scale">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-orbitron text-white tracking-widest">
                    JOIN THE<span className="text-violet-400"> FUTURE</span>
                </h1>
                <p className="text-gray-400 mt-2">Create your account to start discovering events.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-white placeholder-gray-500"
                        placeholder="Asha Rao"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-white placeholder-gray-500"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-white"
                        placeholder="••••••••"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center items-center space-x-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all transform hover:scale-105 shadow-lg shadow-violet-900/50">
                        <span>Create Account</span>
                    </button>
                </div>
            </form>
            <p className="text-center text-sm text-gray-400 mt-8">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="font-semibold text-violet-400 hover:underline">
                    Login
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

export default SignUpPage;