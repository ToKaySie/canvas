import React, { useState } from 'react';
import Header from './components/Header';
import ApiKeyInput from './components/ApiKeyInput';
import ChatInterface from './components/ChatInterface';
import { isValidGoogleApiKey } from './utils/apiValidation';
import { useChat } from './hooks/useChat';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { messages, isLoading, error, sendMessage } = useChat(apiKey);
  const [input, setInput] = useState('');

  const handleConnect = () => {
    if (isValidGoogleApiKey(apiKey)) {
      setIsConnected(true);
      // Removed the introductory message
    } else {
      alert('Please enter a valid Google Cloud API key');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] opacity-10" />
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center">
          <ApiKeyInput
            apiKey={apiKey}
            setApiKey={setApiKey}
            onConnect={handleConnect}
            isConnected={isConnected}
          />
          <ChatInterface
            messages={messages}
            input={input}
            setInput={setInput}
            onSend={handleSend}
            isLoading={isLoading}
            isConnected={isConnected}
            error={error}
          />
        </main>
        <footer className="relative py-4 text-center text-white/50 text-sm">
          <p>Your API key is never stored and only used during your session</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
