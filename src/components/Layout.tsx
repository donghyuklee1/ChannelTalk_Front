import { ReactNode } from 'react';
import styles from '../styles/Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <h1>ChannelTalk</h1>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
