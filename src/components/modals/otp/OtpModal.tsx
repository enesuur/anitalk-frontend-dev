'use client';
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/shared/ui/button/Button';
import styles from './OtpModal.module.css';
import { X } from 'lucide-react';

const otpSchema = z.object({
    otp: z
      .string({
        required_error: 'OTP is required',
        invalid_type_error: 'OTP must be a string of 6 digits',
      })
      .regex(/^\d{6}$/, 'OTP must be exactly 6 digits and only contain numbers')
      .transform((val) => Number(val))
      .nullable(),
  });

type OtpFormData = {
  otp: number | null;
};

interface IOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtpModal: React.FC<IOtpModalProps> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
    reset,
    setValue,
    clearErrors,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: null,
    },
  });

  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const onSubmit = async () => {
    const otp = digits.join('');
    if (otp.length < 6 || !/^\d{6}$/.test(otp)) {
      setValue('otp', null);
      return;
    }

    setValue('otp', Number(otp));
    alert(`OTP Submitted: ${otp}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;

    if (!/^\d?$/.test(val)) return;

    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    clearErrors('otp');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleCloseModal = useCallback(() => {
    reset();
    setDigits(Array(6).fill(''));
    onClose();
  }, [reset, onClose]);

  const handleFormSubmit = async ()=> {


    
  }

  return (
    isOpen && (
      <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Security Pin</h2>
            <X
              size={24}
              color={'#FFFFFF'}
              opacity={0.5}
              onClick={handleCloseModal}
              className={styles.btnClose}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <div className={styles.otpGroup}>
              <label htmlFor='otp' className={styles.otpLabel}>
                Please enter your 6 numbers pin.
              </label>
              <div className={styles.otpContainer}>
                {Array.from({ length: 6 }, (_, index) => (
                  <input
                    key={index}
                    type='text'
                    inputMode='numeric'
                    maxLength={1}
                    value={digits[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`${styles.otpInput} ${errors.otp ? styles.inputError : ''}`}
                    ref={(el) => (inputsRef.current[index] = el)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {errors.otp && <p className={styles.errorText}>{errors.otp.message}</p>}
            </div>

            <div className={styles.btnContainer}>
              <Button
                text={'Submit'}
                onClick={handleSubmit(onSubmit)}
                isLoading={isLoading}
                disabled={isSubmitting}
                style={{ flexBasis: '50%' }}
              />
              <Button
                text={'Cancel'}
                variant={'danger'}
                onClick={handleCloseModal}
                style={{ flexBasis: '50%' }}
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default React.memo(OtpModal);
