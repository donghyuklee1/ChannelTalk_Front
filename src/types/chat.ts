export type Sender = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  sender: Sender;
  content: string;
  createdAt: string;
  status?: 'pending' | 'sent' | 'error';
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
}
