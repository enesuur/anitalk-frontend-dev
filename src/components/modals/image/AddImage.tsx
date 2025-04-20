'use client';
import React, { useCallback, useState } from 'react';
import styles from './AddImage.module.css';
import { X, Info } from 'lucide-react';
import Button from '@/shared/ui/button/Button';
import { iconStyles } from '@/helpers';
import clsx from 'clsx';
import { z } from 'zod';
import TextInput from '@/shared/ui/input/TextInput';

interface ImageState {
  url: string;
  title?: string;
  alt?: string;
}

interface IImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (state: ImageState) => void;
  imageState: ImageState;
  setImageState: React.Dispatch<React.SetStateAction<ImageState>>;
  title?: string;
  placeholder?: string;
}

const imageSchema = z.string().trim().min(1, 'URL cannot be empty!');

const AddImage: React.FC<IImageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  imageState,
  setImageState,
  title = 'Insert Image',
  placeholder = 'https://example.com/image.jpg',
}) => {
  const [formError, setFormError] = useState<string>('');

  const handleChange = (field: keyof ImageState, value: string) => {
    setImageState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = useCallback(() => {
    const result = imageSchema.safeParse(imageState.url);

    if (!result.success) {
      setFormError(result.error.errors[0].message);
      return;
    }

    onSubmit({
      url: result.data,
      alt: imageState.alt,
      title: imageState.title,
    });

    setImageState({
      url: '',
      alt: '',
      title: '',
    });

    setFormError('');
    onClose();
  }, [imageState, onSubmit, onClose, setImageState]);

  const handleCancel = useCallback(() => {
    setImageState({
      url: '',
      alt: '',
      title: '',
    });

    setFormError('');
    onClose();
  }, [onClose, setImageState]);

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
              <span>{formError || 'URL must be a valid image address'}</span>
            </div>

            <TextInput
              label='Image URL'
              name='image-url'
              type='text'
              placeholder={placeholder}
              value={imageState.url}
              onChange={(val) => handleChange('url', val)}
              className={clsx({ [styles.danger]: formError })}
            />

            <TextInput
              label='Alt Text'
              name='image-alt'
              type='text'
              value={imageState.alt || ''}
              onChange={(val) => handleChange('alt', val)}
            />

            <TextInput
              label='Title'
              name='image-title'
              type='text'
              value={imageState.title || ''}
              onChange={(val) => handleChange('title', val)}
            />

            <div className={styles.btnContainer}>
              <Button
                text='Insert'
                onClick={handleSubmit}
                disabled={!imageState.url.trim() || !!formError}
              />
              <Button text='Cancel' variant='danger' onClick={handleCancel} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(AddImage);
