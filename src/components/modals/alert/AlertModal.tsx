'use client';
import React, { useCallback } from 'react';
import styles from './AlertModal.module.css';
import { X } from 'lucide-react';
import Button from '@/shared/ui/button/Button';
import { iconStyles } from '@/helpers';
import { H2, H3 } from '@/shared/ui/headings';

interface IAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  callBack: (param?: boolean) => void;
  title: string;
  text: string;
}

/* TODO: There is something wrong in there you will understand what i meant.
Desing callback for general use.

*/
const AlertModal: React.FC<IAlertModalProps> = ({ isOpen, onClose, title, text }) => {
  const handleOnClick = useCallback(
    (event: React.MouseEvent, action: boolean) => {
      event.stopPropagation();

      if (action) {
        console.log('Action is true, performing action before closing');
      } else {
        console.log('Action is false, performing alternative action before closing');
      }

      onClose();
    },
    [onClose],
  );

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <H2>{title}</H2>
            <X {...iconStyles} onClick={onClose} className={styles.btnClose} />
          </div>
          <div className={styles.modalBody}>
            <H3>{text}</H3>
            <div className={styles.btnContainer}>
              <Button text='Ok' onClick={handleOnClick} />
              <Button text='Cancel' variant={'danger'} onClick={handleOnClick} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(AlertModal);
