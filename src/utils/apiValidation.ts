import { API_CONFIG } from '../config/constants';

export const isValidGoogleApiKey = (apiKey: string): boolean => {
  return apiKey.startsWith(API_CONFIG.API_KEY_PREFIX) && apiKey.length > 30;
};
