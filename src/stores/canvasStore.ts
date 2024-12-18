import { create } from 'zustand';

type Tool = 'edit' | 'format' | 'language' | 'expand' | 'shorten' | 'enhance';

interface CanvasState {
  activeTool: Tool | null;
  content: string;
  setActiveTool: (tool: Tool | null) => void;
  setContent: (content: string) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  activeTool: null,
  content: '',
  setActiveTool: (tool) => set({ activeTool: tool }),
  setContent: (content) => set({ content }),
}));
