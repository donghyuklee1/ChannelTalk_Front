import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatHeader from '@components/ChatHeader';
import ChatInput from '@components/ChatInput';
import ChatMessageList from '@components/ChatMessageList';
import { PROMPTS } from '@constants/index';
import { useChat } from '@hooks/useChat';
import styles from '../styles/ChatPage.module.css';

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const experimentId = searchParams.get('experiment');
  const variationId = searchParams.get('variation');
  const sessionId = useMemo(() => {
    if (experimentId && variationId) {
      return `${experimentId}:${variationId}`;
    }
    if (experimentId) {
      return experimentId;
    }
    return undefined;
  }, [experimentId, variationId]);

  const { messages, isLoading, isSending, error, sendMessage } = useChat(sessionId);

  return (
    <section className={styles.wrapper}>
      <ChatHeader
        title="ChannelTalk Testbed"
        status={isSending ? 'offline' : 'online'}
      />
      {error ? <div className={styles.errorBanner}>{error}</div> : null}
      <ChatMessageList messages={messages} isLoading={isLoading} />
      <ChatInput isSending={isSending} onSubmit={sendMessage} />
      <p className={styles.helperText}>{PROMPTS.systemGreeting}</p>
    </section>
  );
};

export default ChatPage;
