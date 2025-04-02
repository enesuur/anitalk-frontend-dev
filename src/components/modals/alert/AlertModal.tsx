'use client';
import React, { useCallback } from 'react';
import styles from './AlertModal.module.css';
import { X } from 'lucide-react';
import Button from '@/shared/ui/button/Button';

interface IAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  callBack: () => void;
  title: string;
  text: string;
}

const AlertModal: React.FC<IAlertModalProps> = ({ isOpen, onClose, title, text }) => {

  const handleOnClick = useCallback((event: React.MouseEvent, action: boolean) => {
    event.stopPropagation();
    
    if (action) {
      console.log("Action is true, performing action before closing");
    } else {
      console.log("Action is false, performing alternative action before closing");
    }
  
    onClose();
  }, [onClose]);
  
  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <X
              size={24}
              color={'#FFFFFF'}
              opacity={0.9}
              onClick={onClose}
              className={styles.btnClose}
            />
          </div>
          <div className={styles.modalBody}>
            <h2>{text}</h2>
            <div className={styles.btnContainer}>
              <Button 
              text='Ok'
              onClick={handleOnClick}
              />
              <Button 
              text='Cancel' 
              variant={'danger'}
              onClick={handleOnClick}
               />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(AlertModal);
