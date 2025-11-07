import { FormEvent, useState } from 'react';
import styles from '../styles/ChatInput.module.css';
import { PROMPTS } from '@constants/index';

interface ChatInputProps {
  isSending: boolean;
  onSubmit: (message: string) => Promise<void> | void;
}

const ChatInput = ({ isSending, onSubmit }: ChatInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    await onSubmit(trimmed);
    setValue('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        placeholder={
          isSending ? PROMPTS.messagePlaceholders.whileSending : PROMPTS.messagePlaceholders.initial
        }
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={isSending}
        rows={1}
      />
      <button className={styles.button} type="submit" disabled={isSending || !value.trim()}>
        {isSending ? '전송 중' : '전송'}
      </button>
    </form>
  );
};

export default ChatInput;
