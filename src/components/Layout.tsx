import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <h1>ChannelTalk Experiments</h1>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
            end
          >
            프롬프트 실험설정
          </NavLink>
          <NavLink
            to="/testbed"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            테스트 채팅
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            실험 결과
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
