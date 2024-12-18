import React from 'react';
import { Send, Bot, User, PenTool } from 'lucide-react';
import CanvasModal from './Canvas/CanvasModal';

// ... (keep existing imports and interface definitions)

export default function ChatInterface({ 
  messages, 
  input, 
  setInput, 
  onSend, 
  isLoading, 
  isConnected,
  error 
}: ChatInterfaceProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [isCanvasOpen, setIsCanvasOpen] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState<string>('');

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpenCanvas = (content: string) => {
    setSelectedMessage(content);
    setIsCanvasOpen(true);
  };

  if (!isConnected) return null;

  return (
    <>
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col gap-4 p-6">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="group relative">
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/10 text-white/90'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'assistant' && (
                  <button
                    onClick={() => handleOpenCanvas(message.content)}
                    className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 rounded-lg"
                    title="Open in canvas"
                  >
                    <PenTool className="w-4 h-4 text-white/70" />
                  </button>
                )}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-white/80" />
                </div>
              )}
            </div>
          ))}
          {error && (
            <div className="text-red-400 text-center p-2 bg-red-500/10 rounded-lg">
              {error}
            </div>
          )}
          {isLoading && (
            <div className="text-center text-white/50">
              AI is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && input.trim() && onSend()}
            placeholder="Type your message..."
            className="w-full bg-black/50 border border-white/20 rounded-lg pl-4 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <button
            onClick={onSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-2 text-white/80 hover:text-white disabled:text-white/50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
      <CanvasModal
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
        content={selectedMessage}
      />
    </>
  );
}
