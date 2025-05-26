'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { SearchInput } from '@/features/SearchInput';
import styles from './SearchDrawer.module.css';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchDrawer = ({ isOpen, onClose }: SearchDrawerProps) => {
  const controls = useAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  console.log('SearchDrawer: isOpen=', isOpen);

  const variants = {
    open: { y: 0, opacity: 1 },
    closed: { y: '-100%', opacity: 0 },
  };

  useEffect(() => {
    console.log('SearchDrawer: Running animation effect, isOpen=', isOpen);
    if (isOpen) {
      controls.start('open');
      if (inputRef.current) {
        console.log('SearchDrawer: Focusing input');
        inputRef.current.focus();
      }
    } else {
      controls.start('closed');
    }
  }, [isOpen, controls]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log('SearchDrawer: Closing via overlay click');
      onClose();
    }
  };

  const handleOverlayTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log('SearchDrawer: Closing via overlay touch');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={handleOverlayClick}
          onTouchStart={handleOverlayTouchStart}
        >
          <motion.div className={styles.drawer}>
            <SearchInput ref={inputRef} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;
