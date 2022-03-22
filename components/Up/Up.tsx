import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useScrollY } from '../../hooks/useScrollY';
import styles from './Up.module.css';
import UpIcon from './up.svg';
import { motion, useAnimation } from 'framer-motion';

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / (document.body.scrollHeight / 3) });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button className={cn(styles.up)} onClick={scrollToTop} animate={controls} initial={{ opacity: 0 }}>
      <UpIcon />
    </motion.button>
  );
};
