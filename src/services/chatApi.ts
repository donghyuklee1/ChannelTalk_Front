import axios from 'axios';
import type { ChatMessage } from '@types/chat';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000
});

export interface SendMessagePayload {
  sessionId: string;
  message: string;
}

export const sendMessage = async (payload: SendMessagePayload): Promise<ChatMessage> => {
  const { data } = await api.post('/chat/send', payload);
  return data;
};

export const fetchSessionMessages = async (sessionId: string): Promise<ChatMessage[]> => {
  const { data } = await api.get(`/chat/sessions/${sessionId}/messages`);
  return data;
};
