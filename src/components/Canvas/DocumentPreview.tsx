import React from 'react';
import { useCanvasStore } from '../../stores/canvasStore';

export default function DocumentPreview() {
  const { content, activeTool } = useCanvasStore();

  return (
    <div className="p-6">
      <div className="bg-white/5 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white/90 mb-4">Document Preview</h3>
        <div className="prose prose-invert max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
}
