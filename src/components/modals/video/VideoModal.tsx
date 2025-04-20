'use client';
import React, { useCallback, useState } from 'react';
import styles from './VideoModal.module.css';
import { X, Info } from 'lucide-react';
import Button from '@/shared/ui/button/Button';
import { iconStyles } from '@/helpers';
import clsx from 'clsx';
import { z } from 'zod';
import TextInput from '@/shared/ui/input/TextInput';

interface IVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, width: number, height: number) => void;
  url: string;
  handleUrlChange: (url: string) => void;
  width: number;
  handleWidthChange: (width: number) => void;
  height: number;
  handleHeightChange: (height: number) => void;
  title?: string;
  placeholder?: string;
}

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

const VideoModal: React.FC<IVideoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  url,
  handleUrlChange,
  width,
  handleWidthChange,
  height,
  handleHeightChange,
  title = 'Insert Video',
  placeholder = 'https://youtube.com/watch?v=...',
}) => {
  const [formError, setFormError] = useState<string>('');

  const handleSubmit = useCallback(() => {
    const result = urlSchema.safeParse(url);

    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }

    const formattedUrl = result.data;
    onSubmit(formattedUrl, width, height);
    handleUrlChange('');
    handleWidthChange(640);
    handleHeightChange(480);
    setFormError('');
    onClose();
  }, [
    url,
    width,
    height,
    onSubmit,
    onClose,
    handleUrlChange,
    handleWidthChange,
    handleHeightChange,
  ]);

  const handleCancel = useCallback(() => {
    handleUrlChange('');
    handleWidthChange(640);
    handleHeightChange(480);
    setFormError('');
    onClose();
  }, [onClose, handleUrlChange, handleWidthChange, handleHeightChange]);

  return (
    isOpen && (
      <div className={styles.modalOverlay} onClick={handleCancel}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <X {...iconStyles} onClick={handleCancel} className={styles.btnClose} />
          </div>
          <div className={styles.modalBody}>
            <div className={clsx(styles.infoBox, { [styles.danger]: formError })}>
              <Info size={16} />
              <span>{formError || 'URL must start with http:// or https://'}</span>
            </div>

            <TextInput
              label='Video URL'
              name='url-input'
              type='text'
              placeholder={placeholder}
              value={url}
              onChange={handleUrlChange}
              className={clsx({ [styles.danger]: formError })}
            />

            <div className={styles.dimensionsContainer}>
              <TextInput
                label='Width'
                name='width-input'
                type='number'
                value={width.toString()}
                onChange={(value) => handleWidthChange(parseInt(value) || 640)}
              />
              <TextInput
                label='Height'
                name='height-input'
                type='number'
                value={height.toString()}
                onChange={(value) => handleHeightChange(parseInt(value) || 480)}
              />
            </div>

            <div className={styles.btnContainer}>
              <Button text='Insert' onClick={handleSubmit} disabled={!url.trim() || !!formError} />
              <Button text='Cancel' variant='danger' onClick={handleCancel} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(VideoModal);
