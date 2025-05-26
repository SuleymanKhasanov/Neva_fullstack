'use client';

import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/shared/ui/Input/Input';
import styles from './SearchButton.module.css';

const SearchButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    console.log('Search value:', value);
  };

  return (
    <>
      <button className={styles.searchButton} onClick={toggleSearch}>
        <LuSearch className={styles.searchIcon} />
      </button>
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={toggleSearch}
            />
            <motion.div
              className={styles.searchDrawer}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Input
                type="search"
                placeholder="Search..."
                className={styles.searchInput}
                value={searchValue}
                onChange={handleSearchChange}
                autoFocus
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchButton;
