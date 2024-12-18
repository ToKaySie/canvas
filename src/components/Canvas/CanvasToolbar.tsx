import React from 'react';
import { Edit3, Eraser, Type, Languages, ArrowUpRight, ArrowDownRight, Wand2 } from 'lucide-react';
import { useCanvasStore } from '../../stores/canvasStore';

const tools = [
  { icon: Edit3, label: 'Edit', action: 'edit' },
  { icon: Type, label: 'Format', action: 'format' },
  { icon: Languages, label: 'Language', action: 'language' },
  { icon: ArrowUpRight, label: 'Expand', action: 'expand' },
  { icon: ArrowDownRight, label: 'Shorten', action: 'shorten' },
  { icon: Wand2, label: 'Enhance', action: 'enhance' },
] as const;

export default function CanvasToolbar() {
  const { setActiveTool, activeTool } = useCanvasStore();

  return (
    <div className="w-20 border-r border-white/10 p-2 flex flex-col gap-2">
      {tools.map(({ icon: Icon, label, action }) => (
        <button
          key={action}
          onClick={() => setActiveTool(action)}
          className={`p-3 rounded-lg flex flex-col items-center gap-1 transition-colors ${
            activeTool === action
              ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white'
              : 'hover:bg-white/10 text-white/70'
          }`}
          title={label}
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
}
