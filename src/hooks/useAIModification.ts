import { useState } from 'react';
import { useCanvasStore } from '../stores/canvasStore';
import { Message } from '../types/canvas';
import { sendMessageToAI } from '../services/ai';
import { extractModifiedSection, mergeModifiedSection } from '../utils/textModification';

export function useAIModification() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { content, setContent } = useCanvasStore();

  const modifyText = async (instruction: string) => {
    setIsLoading(true);
    try {
      const userMessage: Message = { role: 'user', content: instruction };
      setMessages(prev => [...prev, userMessage]);

      // Extract the section to modify based on the instruction
      const { section, start, end } = extractModifiedSection(content, instruction);
      
      // Create a specific prompt for the AI
      const prompt = `${instruction}\n\nHere's the text to modify:\n\n${section}`;
      
      // Get AI response
      const modifiedSection = await sendMessageToAI(prompt);
      
      // Merge the modified section back into the original text
      const newContent = mergeModifiedSection(content, modifiedSection, start, end);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'I've modified the text as requested. You can see the changes in the preview.'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setContent(newContent);
    } catch (error) {
      console.error('Error modifying text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    modifyText
  };
}
