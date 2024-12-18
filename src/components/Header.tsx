import React from 'react';
import { Brain } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-light tracking-wider text-white">AI Connect</span>
        </div>
        <h1 className="text-2xl font-light tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Connect to Your Personal AI
        </h1>
      </div>
    </header>
  );
}
