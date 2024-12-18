import { API_CONFIG } from '../config/constants';
import { AIResponse } from '../types/api';

export async function sendMessageToAI(message: string, apiKey: string): Promise<string> {
  if (!message.trim() || !apiKey) {
    throw new Error('Message and API key are required');
  }

  try {
    const response = await fetch(`${API_CONFIG.GOOGLE_CLOUD_API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: message
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data: AIResponse = await response.json();
    return data.candidates[0]?.content.parts[0]?.text || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error calling AI API:', error);
    throw error;
  }
}
