import React from 'react';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onConnect: () => void;
  isConnected: boolean;
}

export default function ApiKeyInput({ apiKey, setApiKey, onConnect, isConnected }: ApiKeyInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && apiKey && !isConnected) {
      onConnect();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="relative backdrop-blur-xl bg-black/30 rounded-lg p-8 border border-white/10">
        <div className="absolute -top-3 -left-3 w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-20" />
        <div className="relative">
          <label className="block text-white/80 mb-2 text-sm">Enter your Google Cloud API Key to start the conversation</label>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isConnected}
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="AIza..."
              />
              <Key className="absolute right-3 top-2.5 w-5 h-5 text-white/30" />
            </div>
            <button
              onClick={onConnect}
              disabled={!apiKey || isConnected}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnected ? 'Connected' : 'Connect'}
            </button>
          </div>
          <p className="mt-2 text-xs text-white/50">Your API key is never stored and only used during your session</p>
        </div>
      </div>
    </div>
  );
}
