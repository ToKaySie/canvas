import React from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { useCanvasStore } from '../../../stores/canvasStore';
import { useAIModification } from '../../../hooks/useAIModification';

export default function AIChat() {
  const { messages, isLoading, modifyText } = useAIModification();

  return (
    <div className="flex flex-col h-full">
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={modifyText} isLoading={isLoading} />
    </div>
  );
}
