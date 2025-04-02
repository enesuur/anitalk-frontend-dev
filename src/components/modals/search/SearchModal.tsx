import React, { useState, useCallback } from 'react';
import styles from './SearchModal.module.css';
import useDebounce from '@/hooks/useDebounce';
import { X, Search, Eraser, AlertCircle } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span>Search</span>
          <X onClick={handleOverlayClick} width={24} height={24} />
        </div>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search users, anime, and so on'
            className={styles.searchInput}
          />
          {searchTerm && <Eraser className={styles.clearIcon} onClick={handleClearSearch} />}
        </div>
        <div className={styles.hintBox}>
          <div className={styles.hintHeader}>
            <AlertCircle width={16} height={16} />
            <h4>Beta</h4>
          </div>
          <p>This feature is still in development. Your feedback is valuable :)</p>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
