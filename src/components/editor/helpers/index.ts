import { convertFileToBase64 } from '@/lib/tiptap-utils';

/**
 * Handles image upload with progress tracking and abort capability
 */
export const handleImageUpload = async (
  _file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal,
): Promise<string> => {
  // Simulate upload progress
  for (let progress = 0; progress <= 100; progress += 10) {
    if (abortSignal?.aborted) {
      throw new Error('Upload cancelled');
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    onProgress?.({ progress });
  }

  return convertFileToBase64(_file, abortSignal);

  // Uncomment to use actual file conversion:
  // return convertFileToBase64(file, abortSignal)
};

export const MAX_FILE_SIZE = 5 * 1204 * 1024;

export const IMAGE_FILE_LIMIT = 10;
