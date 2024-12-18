export interface AIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
