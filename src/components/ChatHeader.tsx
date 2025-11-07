import styles from '../styles/ChatHeader.module.css';

interface ChatHeaderProps {
  title: string;
  status?: 'online' | 'offline';
}

const statusCopy = {
  online: '온라인',
  offline: '오프라인'
} as const;

const ChatHeader = ({ title, status = 'online' }: ChatHeaderProps) => {
  return (
    <div className={styles.header}>
      <div>
        <h2>{title}</h2>
        <p className={styles.status} data-status={status}>
          {statusCopy[status]}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
