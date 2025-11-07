import ChatHeader from '@components/ChatHeader';
import ChatInput from '@components/ChatInput';
import ChatMessageList from '@components/ChatMessageList';
import { PROMPTS } from '@constants/index';
import { useChat } from '@hooks/useChat';
import styles from '../styles/ChatPage.module.css';

const ChatPage = () => {
  const { messages, isLoading, isSending, error, sendMessage } = useChat();

  return (
    <section className={styles.wrapper}>
      <ChatHeader title="ChannelTalk Support" status="online" />
      {error ? <div className={styles.errorBanner}>{error}</div> : null}
      <ChatMessageList messages={messages} isLoading={isLoading} />
      <ChatInput isSending={isSending} onSubmit={sendMessage} />
      <p className={styles.helperText}>{PROMPTS.systemGreeting}</p>
    </section>
  );
};

export default ChatPage;
