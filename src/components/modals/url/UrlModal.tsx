'use client';
import React, { useCallback } from 'react';
import styles from './UrlModal.module.css';
import { X, Info } from 'lucide-react';
import Button from '@/shared/ui/button/Button';
import { iconStyles } from '@/helpers';
import clsx from 'clsx';
import { z } from 'zod';
import TextInput from '@/shared/ui/input/TextInput';

interface IUrlInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  url: string;
  handleUrlChange: (url: string) => void;
  title?: string;
  placeholder?: string;
}

// Zod URL schema
const urlSchema = z
  .string()
  .trim()
  .min(1, 'URL cannot be empty')
  .transform((val) => (val.includes('://') ? val : `https://${val}`))
  .refine(
    (val) => {
      try {
        const parsed = new URL(val);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    },
    {
      message: 'Please enter a valid URL',
    },
  );

const UrlInputModal: React.FC<IUrlInputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  url,
  handleUrlChange,
  error,
  title = 'Insert a Link',
  placeholder = 'https://anitalks.com',
}) => {
  const handleSubmit = useCallback(() => {
    const result = urlSchema.safeParse(url);

    if (!result.success) {
      handleUrlChange(url);
      return;
    }

    const formattedUrl = result.data;
    onSubmit(formattedUrl);
    handleUrlChange('');
    onClose();
  }, [url, onSubmit, onClose, handleUrlChange]);

  const handleCancel = useCallback(() => {
    handleUrlChange('');
    onClose();
  }, [onClose, handleUrlChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    },
    [handleSubmit, handleCancel],
  );

  return (
    isOpen && (
      <div className={styles.modalOverlay} onClick={handleCancel}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <X {...iconStyles} onClick={handleCancel} className={styles.btnClose} />
          </div>
          <div className={styles.modalBody}>
            <div className={clsx(styles.infoBox, { [styles.danger]: error })}>
              <Info size={16} />
              <span>{error || 'URL must start with http:// or https://'}</span>
            </div>

            <TextInput
              label='URL'
              name='url-input'
              type='text'
              placeholder={placeholder}
              value={url}
              onChange={(value) => handleUrlChange(value)}
              onKeyDown={handleKeyDown}
              className={clsx({ [styles.danger]: error })}
            />

            <div className={styles.btnContainer}>
              <Button text='Insert' onClick={handleSubmit} disabled={!url.trim() || !!error} />
              <Button text='Cancel' variant='danger' onClick={handleCancel} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(UrlInputModal);
