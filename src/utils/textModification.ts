import { TextSection } from '../types/canvas';

export function extractModifiedSection(content: string, instruction: string): TextSection {
  // Default to modifying the entire text
  let section = content;
  let start = 0;
  let end = content.length;

  // Extract specific sections based on instruction keywords
  if (instruction.toLowerCase().includes('conclusion')) {
    const lastParagraphMatch = content.match(/[^\n]+$/);
    if (lastParagraphMatch) {
      start = lastParagraphMatch.index || 0;
      section = lastParagraphMatch[0];
    }
  } else if (instruction.toLowerCase().includes('introduction')) {
    const firstParagraphMatch = content.match(/^[^\n]+/);
    if (firstParagraphMatch) {
      end = firstParagraphMatch[0].length;
      section = firstParagraphMatch[0];
    }
  }
  // Add more section extraction logic for other cases

  return { section, start, end };
}

export function mergeModifiedSection(
  originalText: string,
  modifiedSection: string,
  start: number,
  end: number
): string {
  return originalText.substring(0, start) + modifiedSection + originalText.substring(end);
}
