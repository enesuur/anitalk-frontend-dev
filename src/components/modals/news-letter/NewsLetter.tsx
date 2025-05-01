'use client';
import React, { useCallback } from 'react';
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/shared/ui/button/Button';
import InpMail from '@/shared/ui/input/mail/InpMail';
import { iconStyles } from '@/helpers';
import { H2 } from '@/shared/ui/headings';
import { Mail } from 'lucide-react';
import styles from './styles.module.css';

/* 
TODO: We will get user email as default from redux if there is a user.
*/

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .min(1, 'Email is required.'),
});

type NewsletterForm = z.infer<typeof emailSchema>;

interface INewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterModal: React.FC<INewsletterModalProps> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isLoading },
    reset,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = useCallback(
    async (data: NewsletterForm) => {
      console.log('Email submitted:', data.email);
      reset();
      onClose();
    },
    [onClose, reset],
  );

  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    isOpen && (
      <div className={styles.modalOverlay} onClick={handleCancel}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <H2 className={styles.horizontalBox}>
              <Mail {...iconStyles} />
              Stay in the Loop!
            </H2>
            <X {...iconStyles} onClick={handleCancel} className={styles.btnClose} />
          </div>
          <small>
            Get the latest anime news, updates, and exclusive content straight to your inbox. Join
            our newsletter today!
          </small>
          <div className={styles.modalBody}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <InpMail
                  label='Email Address'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={errors.email?.message}
                />
              )}
            />

            <div className={styles.btnContainer}>
              <Button
                text='Subscribe'
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
                disabled={!!errors.email || isSubmitting}
              />
              <Button text='Cancel' variant='danger' onClick={handleCancel} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default React.memo(NewsletterModal);
