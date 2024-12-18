import React, { useEffect } from 'react';
import { useCanvasStore } from '../../stores/canvasStore';

interface TextEditorProps {
  initialContent: string;
}

export default function TextEditor({ initialContent }: TextEditorProps) {
  const { setContent, activeTool } = useCanvasStore();
  const [localContent, setLocalContent] = React.useState(initialContent);
  
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    setContent(newContent);
  };
  
  const handleToolAction = async () => {
    // Implement tool actions here
    switch (activeTool) {
      case 'expand':
        // API call to expand text
        break;
      case 'shorten':
        // API call to shorten text
        break;
      case 'enhance':
        // API call to enhance text
        break;
      // Add more cases for other tools
    }
  };

  React.useEffect(() => {
    if (activeTool) {
      handleToolAction();
    }
  }, [activeTool]);

  return (
    <div className="min-h-full bg-white/5 rounded-lg p-6">
      <textarea
        value={localContent}
        onChange={handleContentChange}
        className="w-full min-h-[500px] bg-transparent text-white/90 resize-none focus:outline-none"
        placeholder="Start typing or use the tools to modify the text..."
      />
    </div>
  );
}
