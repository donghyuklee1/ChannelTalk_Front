import { Fragment } from 'react';
import { format } from 'date-fns';
import styles from '../styles/ChatMessageList.module.css';
import type { ChatMessage } from '@types/chat';
import { MESSAGE_STATUS_COPY } from '@constants/index';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageSkeleton = () => (
  <div className={styles.skeleton}>
    <span />
    <span />
  </div>
);

const ChatMessageList = ({ messages, isLoading }: ChatMessageListProps) => {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {messages.map((message) => {
        const timestamp = format(new Date(message.createdAt), 'HH:mm');
        const isUser = message.sender === 'user';
        return (
          <Fragment key={message.id}>
            <div
              className={isUser ? styles.userMessage : styles.botMessage}
              data-status={message.status || 'sent'}
            >
              <p>{message.content}</p>
              <span className={styles.meta}>
                {timestamp}
                {message.status && message.status !== 'sent'
                  ? ` · ${MESSAGE_STATUS_COPY[message.status]}`
                  : null}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ChatMessageList;
