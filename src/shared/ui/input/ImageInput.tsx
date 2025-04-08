'use client';
import React, { useState, useRef, useCallback } from 'react';
import styles from './ImageInput.module.css';
import { ImageFile } from '@/assets/icons/index';

const MAX_FILE_SIZE_MB = 5;
const MIN_FILE_SIZE_KB = 10;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

type ImageInputProps = {
  onImageSelect?: (file: File, previewUrl: string) => void;
};

const ImageInput = ({ onImageSelect }: ImageInputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateAndSetFile = useCallback(
    (file: File) => {
      const sizeInMB = file.size / (1024 * 1024);
      const sizeInKB = file.size / 1024;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Unsupported file type.');
        setFile(null);
        return;
      }

      if (sizeInMB > MAX_FILE_SIZE_MB) {
        setError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
        setFile(null);
        return;
      }

      if (sizeInKB < MIN_FILE_SIZE_KB) {
        setError(`File is too small. Min size is ${MIN_FILE_SIZE_KB}KB.`);
        setFile(null);
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      setFile(file);
      setError(null);

      if (onImageSelect) {
        onImageSelect(file, fileUrl);
      }
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
      {!imageUrl ? (
        <div className={styles.uploadContainer}>
          <ImageFile
            width={32}
            height={32}
            color={'#FFFFFF'}
            opacity={0.8}
            style={{ margin: 'auto' }}
          />
          <p className={styles.instruction}>
            Upload your image drag & drop a file here, or
            <span className={styles.clickText}> click to upload</span>
          </p>
        </div>
      ) : null}

      <input
        type='file'
        accept={ACCEPTED_TYPES.join(',')}
        ref={inputRef}
        onChange={handleFileChange}
        hidden
      />

      {file && <p className={styles.success}>Selected file: {file.name}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default React.memo(ImageInput);
