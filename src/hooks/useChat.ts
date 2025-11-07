import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchSessionMessages, sendMessage } from '@services/chatApi';
import type { ChatMessage } from '@types/chat';

const DEFAULT_SESSION_ID = 'default';

export const useChat = (sessionId?: string) => {
  const activeSessionId = sessionId ?? DEFAULT_SESSION_ID;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSessionMessages(activeSessionId);
      setMessages(data);
    } catch (err) {
      setError('메시지를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [activeSessionId]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;
      const optimisticMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        content,
        sender: 'user',
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      setMessages((prev) => [...prev, optimisticMessage]);
      setIsSending(true);
      setError(null);
      try {
        const sent = await sendMessage({ sessionId: activeSessionId, message: content });
        setMessages((prev) =>
          prev.map((msg) => (msg.id === optimisticMessage.id ? sent : msg))
        );
      } catch (err) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: 'error' } : msg
          )
        );
        setError('메시지 전송에 실패했습니다.');
      } finally {
        setIsSending(false);
      }
    },
    [activeSessionId]
  );

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  const state = useMemo(
    () => ({
      messages,
      isLoading,
      isSending,
      error
    }),
    [messages, isLoading, isSending, error]
  );

  return {
    ...state,
    loadMessages,
    sendMessage: handleSendMessage
  };
};
