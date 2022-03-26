import cn from 'classnames';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components';
import { motion, useReducedMotion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: { opacity: shouldReduceMotion ? 1 : 0, x: '100%' },
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo className={styles.logo} />
      <ButtonIcon onClick={() => setIsOpened(true)} appearance='white' icon='menu' />
      <motion.div
        variants={variants}
        initial='closed'
        animate={isOpened ? 'opened' : 'closed'}
        className={cn(styles.mobileMenu)}>
        <Sidebar />
        <ButtonIcon onClick={() => setIsOpened(false)} className={styles.menuClose} appearance='white' icon='close' />
      </motion.div>
    </header>
  );
};
