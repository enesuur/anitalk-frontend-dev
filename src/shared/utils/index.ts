export interface ImageUploadConfig {
  readonly MAX_FILE_SIZE_MB: number;
  readonly MIN_FILE_SIZE_KB: number;
  readonly ACCEPTED_TYPES: readonly string[];
}

const IMAGE_UPLOAD: ImageUploadConfig = Object.freeze({
  MAX_FILE_SIZE_MB: 1,
  MIN_FILE_SIZE_KB: 10,
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
});

Object.freeze(IMAGE_UPLOAD);

export { IMAGE_UPLOAD };
