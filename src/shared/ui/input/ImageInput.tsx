'use client';
import React, { useState, useRef, useCallback } from 'react';
import styles from './ImageInput.module.css';
import { ImageFile } from '@/assets/icons';
import { IMAGE_UPLOAD } from '../../utils';
import { Trash2, FileCheck, Info } from 'lucide-react';
import { iconStyles } from '@/helpers';

type ImageInputProps = {
  onImageSelect?: (file: File | null, previewUrl: string | null) => void;
};

const ImageInput = ({ onImageSelect }: ImageInputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const clearImage = useCallback(() => {
    setFile(null);
    setImageUrl(null);
    setError(null);
    onImageSelect?.(null, null);
  }, [onImageSelect]);

  const validateAndSetFile = useCallback(
    (file: File) => {
      const sizeInMB = file.size / (1024 * 1024);
      const sizeInKB = file.size / 1024;

      let errorMessage = null;

      switch (true) {
        case !IMAGE_UPLOAD.ACCEPTED_TYPES.includes(file.type):
          errorMessage = 'Unsupported file type.';
          break;
        case sizeInMB > IMAGE_UPLOAD.MAX_FILE_SIZE_MB:
          errorMessage = `File is too large. Max size is ${IMAGE_UPLOAD.MAX_FILE_SIZE_MB}MB.`;
          break;
        case sizeInKB < IMAGE_UPLOAD.MIN_FILE_SIZE_KB:
          errorMessage = `File is too small. Min size is ${IMAGE_UPLOAD.MIN_FILE_SIZE_KB}KB.`;
          break;
        default:
          const fileUrl = URL.createObjectURL(file);
          setImageUrl(fileUrl);
          setFile(file);
          setError(null);
          onImageSelect?.(file, fileUrl);
          return;
      }

      setError(errorMessage);
      setFile(null);
    },
    [onImageSelect],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) validateAndSetFile(selectedFile);
    },
    [validateAndSetFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) validateAndSetFile(droppedFile);
    },
    [validateAndSetFile],
  );

  const renderUploadBox = useCallback(
    () => (
      <div className={styles.uploadBox}>
        <ImageFile {...iconStyles} width={48} height={48} style={{ margin: 'auto' }} />
        <p className={styles.instruction}>
          Upload your image, drag & drop a file here, or
          <span className={styles.clickText}> click to upload</span>
        </p>
      </div>
    ),
    [],
  );

  const renderRemoveButton = useCallback(
    () => (
      <button type='button' onClick={clearImage} className={styles.removeBtn}>
        <Trash2 size={16} />
        <span>Remove</span>
      </button>
    ),
    [clearImage],
  );

  return (
    <div
      className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      {!imageUrl ? renderUploadBox() : renderRemoveButton()}

      <input
        type='file'
        accept={IMAGE_UPLOAD.ACCEPTED_TYPES.join(',')}
        ref={inputRef}
        onChange={handleFileChange}
        hidden
      />

      {file && (
        <p className={styles.successBox}>
          <FileCheck className={styles.successIcon} />
          <span className={styles.successText}>Selected file: {file.name}</span>
        </p>
      )}
      {error && (
        <p className={styles.errorBox}>
          <Info className={styles.errorIcon} />
          <span className={styles.errorText}>{error}</span>
        </p>
      )}
    </div>
  );
};

export default React.memo(ImageInput);
