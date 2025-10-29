
import React from 'react';
import { CheckCircleIcon, LinkIcon, SourceDevpost, SourceNovafest, SourceUnstop } from './icons';

interface AccountSyncProps {
    connectedAccounts: {
        source: string;
        connected: boolean;
        synced_at: string | null;
    }[];
}

const ConnectorCard: React.FC<{ source: string; connected: boolean; synced_at: string | null }> = ({ source, connected, synced_at }) => {
    const getIcon = () => {
        switch (source.toLowerCase()) {
            case 'devpost': return <SourceDevpost className="w-8 h-8"/>;
            case 'novafest': return <SourceNovafest className="w-8 h-8"/>;
            case 'unstop': return <SourceUnstop className="w-8 h-8"/>;
            default: return null;
        }
    }

    return (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                    {getIcon()}
                </div>
                <div>
                    <p className="text-xl font-bold text-white capitalize">{source}</p>
                    {connected && synced_at && (
                        <p className="text-xs text-gray-400">
                            Last synced: {new Date(synced_at).toLocaleString()}
                        </p>
                    )}
                </div>
            </div>
            {connected ? (
                <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg">
                    <CheckCircleIcon />
                    <span className="font-semibold">Connected</span>
                </div>
            ) : (
                <button className="flex items-center space-x-2 px-4 py-2 font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg shadow-teal-900/50">
                    <LinkIcon />
                    <span>Connect Account</span>
                </button>
            )}
        </div>
    );
}

export const AccountSync: React.FC<AccountSyncProps> = ({ connectedAccounts }) => {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-orbitron font-bold text-white">Account Sync</h1>
                <p className="mt-2 text-gray-400">Connect your accounts to automatically sync your event participation.</p>
            </div>
            <div className="space-y-4">
                {connectedAccounts.map(account => (
                    <ConnectorCard key={account.source} {...account} />
                ))}
            </div>
        </div>
    );
};
