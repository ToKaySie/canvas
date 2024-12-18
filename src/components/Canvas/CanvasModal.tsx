// src/components/Canvas/CanvasModal.tsx

import React from 'react';
import { X, ZoomIn, ZoomOut, PanelLeftClose, PanelLeftOpen, FileText } from 'lucide-react';
import CanvasToolbar from './CanvasToolbar';
import TextEditor from './TextEditor';
import DocumentPreview from './DocumentPreview';
import { useCanvasStore } from '../../stores/canvasStore';
import { exportToMarkdown } from '../../utils/export';

interface CanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

export default function CanvasModal({ isOpen, onClose, content }: CanvasModalProps) {
  const [scale, setScale] = React.useState(1);
  const [isPanelOpen, setIsPanelOpen] = React.useState(true);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="animate-slideIn w-[95vw] h-[90vh] bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-2xl border border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-light text-white">Interactive Canvas</h2>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70"
              title={isPanelOpen ? "Close preview" : "Open preview"}
            >
              {isPanelOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToMarkdown(content)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Export to Markdown"
            >
              <FileText className="w-5 h-5 text-white/70" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex">
          <CanvasToolbar />
          
          <div className={`flex-1 flex ${isPanelOpen ? 'divide-x divide-white/10' : ''}`}>
            <div className={`${isPanelOpen ? 'w-1/2' : 'w-full'} overflow-auto transition-all duration-300`}>
              <div className="p-6">
                <div style={{ transform: `scale(${scale})` }} className="min-h-full transition-transform">
                  <TextEditor initialContent={content} />
                </div>
              </div>
            </div>
            
            {isPanelOpen && (
              <div className="w-1/2 overflow-auto transition-all duration-300">
                <DocumentPreview />
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ZoomOut className="w-5 h-5 text-white/70" />
            </button>
            <button
              onClick={() => setScale(s => Math.min(2, s + 0.1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ZoomIn className="w-5 h-5 text-white/70" />
            </button>
            <span className="text-white/50 self-center">{Math.round(scale * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
