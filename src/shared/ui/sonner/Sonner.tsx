import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Sonner.module.css';
import { iconStyles } from '@/helpers/index';
import { Info } from 'lucide-react';
import { truncateWithTrail } from '@/helpers/index';

interface ISonnerProps {
  isOpen: boolean;
  message: string;
  title: string;
  onClose: () => void;
}

const Sonner: React.FC<ISonnerProps> = ({ isOpen, message, onClose, title }) => {
  const [visible, setVisible] = useState<boolean>(isOpen);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setVisible(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(handleClose, 3500);
    } else {
      setVisible(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpen, handleClose]);

  if (!visible) return null;

  return (
    <div className={styles.sonnerBox}>
      <p className={styles.messageBox}>
        <span className={styles.titleText}>{title}</span>
        <span className={styles.messageText}>{truncateWithTrail(message, 75)}</span>
      </p>
    </div>
  );
};

export default React.memo(Sonner);
