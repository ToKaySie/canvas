// src/utils/export.ts

import { useCanvasStore } from '../stores/canvasStore';
import { marked } from 'marked';

const defaultCSS = `
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1, h2, h3 {
    color: #2563eb;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  pre {
    background: #f1f5f9;
    padding: 1rem;
    border-radius: 0.5rem;
  }
`;

export async function exportToPDF() {
  const { content } = useCanvasStore.getState();
  
  try {
    // Convert content to Markdown
    const markdown = await sendMessageToAI(
      `Convert this text to well-formatted markdown:\n\n${content}`
    );
    
    // Convert Markdown to HTML
    const html = marked(markdown);
    
    // Combine HTML with CSS
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${defaultCSS}</style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
    
    // Create blob and download
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
  }
}

export function exportToMarkdown(content: string) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
