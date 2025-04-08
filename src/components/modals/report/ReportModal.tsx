'use client';
import React, { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ReportModal.module.css';
import { X, AlertCircle } from 'lucide-react';
import Button from '@/shared/ui/button/Button';
import Checkbox from '@/shared/ui/checkbox/Checkbox';

const schema = z.object({
  category: z
    .number({
      required_error: 'You must select a category before submitting.',
      invalid_type_error: 'Invalid selection. Please choose a valid category.',
    })
    .min(0, 'Please select a valid category from the list.'),
});

interface IReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  callBack: (category: number) => void;
  type: 0 | 1;
}

interface IReport {
  type: number;
  text: string;
}

const USER_REPORTS: IReport[] = [
  { type: 0, text: 'Harassment & Toxic Behavior' },
  { type: 1, text: 'Inappropriate Sexual Content' },
  { type: 2, text: 'Misleading or Out-of-Context Profile' },
  { type: 3, text: 'Promotion or Endorsement of Violence' },
];

const ENTRY_REPORTS: IReport[] = [
  { type: 0, text: 'Harassment & Toxic Behavior' },
  { type: 1, text: 'Explicit or Inappropriate Content' },
  { type: 2, text: 'Off-Topic or Misleading Information' },
  { type: 3, text: 'Violent or Threatening Content' },
];

const ReportModal: React.FC<IReportModalProps> = ({ isOpen, onClose, callBack, type }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const reportCategories = useMemo(() => (type === 0 ? USER_REPORTS : ENTRY_REPORTS), [type]);

  const onSubmit = useCallback(
    async (data: { category: number }) => {
      callBack(data.category);
      // TODO: PROMISE.ALL PARAREL + BLOCK + REDIRECT MAYBE
      reset();
      onClose();
    },
    [callBack, onClose, reset],
  );

  const handleOnClick = useCallback(
    async (param: number) => {
      if (param === 1) {
        reset();
        onClose();
      } else {
        await handleSubmit(onSubmit)();
      }
    },
    [onClose, handleSubmit, onSubmit, reset],
  );

  const handleCloseModal = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  return (
    isOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>{type === 0 ? 'Report User' : 'Report Entry'}</h2>
            <X
              size={24}
              color={'#FFFFFF'}
              opacity={0.9}
              onClick={handleCloseModal}
              className={styles.btnClose}
            />
          </div>
          <div className={styles.modalBody}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className={styles.actionHeader}>
                  <AlertCircle width={20} height={20} opacity={0.9} color={'#FFFFFF'} />
                  <span>Please choose an report action</span>
                </div>
                <div className={styles.checkboxGroup}>
                  {reportCategories.map((category) => (
                    <Controller
                      key={category.type}
                      name='category'
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          label={category.text}
                          checked={field.value === category.type}
                          onChange={() => field.onChange(category.type)}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>

              {errors.category && <p className={styles.errorText}>{errors.category.message}</p>}
              <div className={styles.btnContainer}>
                <Button
                  text={'Report'}
                  onClick={() => handleOnClick}
                  isLoading={isLoading}
                  disabled={isSubmitting}
                />
                <Button text={'Cancel'} variant={'danger'} onClick={handleCloseModal} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(ReportModal);
