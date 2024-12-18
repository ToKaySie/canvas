import React from 'react';
import { FileText, Maximize2, Minimize2, GraduationCap, FileDown, Languages } from 'lucide-react';
import ActionButton from './ActionButton';
import { useAIModification } from '../../../hooks/useAIModification';
import { exportToPDF } from '../../../utils/export';
import { ModificationAction } from '../../../types/canvas';

const QUICK_ACTIONS: ModificationAction[] = [
  {
    icon: Maximize2,
    label: 'Expand',
    instruction: 'Make this text longer while preserving its exact meaning and keeping all other parts unchanged',
    confirmMessage: 'Would you like to expand this text while keeping its meaning?'
  },
  {
    icon: Minimize2,
    label: 'Shorten',
    instruction: 'Make this text more concise while preserving its exact meaning and keeping all other parts unchanged',
    confirmMessage: 'Would you like to make this text more concise?'
  },
  {
    icon: GraduationCap,
    label: 'High School',
    instruction: 'Adapt this text to a high school level while keeping all other parts unchanged',
    confirmMessage: 'Would you like to adapt this text for high school level?'
  },
  {
    icon: Languages,
    label: 'Simplify',
    instruction: 'Simplify the language in this text while keeping all other parts unchanged',
    confirmMessage: 'Would you like to simplify the language in this text?'
  }
];

export default function QuickActions() {
  const { isLoading, modifyText } = useAIModification();

  return (
    <div className="flex flex-col gap-4 p-4 border-b border-white/10">
      <div className="flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <ActionButton
            key={action.label}
            icon={action.icon}
            label={action.label}
            onClick={() => modifyText(action.instruction)}
            isLoading={isLoading}
            confirmMessage={action.confirmMessage}
          />
        ))}
      </div>
      
      <div className="flex justify-center">
        <ActionButton
          icon={FileDown}
          label="Export to PDF"
          onClick={exportToPDF}
          variant="primary"
          confirmMessage="Would you like to export this document as PDF?"
        />
      </div>
    </div>
  );
}
