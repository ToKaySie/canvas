import { LucideIcon } from 'lucide-react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ModificationAction {
  icon: LucideIcon;
  label: string;
  instruction: string;
  confirmMessage: string;
}

export interface TextSection {
  section: string;
  start: number;
  end: number;
}
