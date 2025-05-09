'use client';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import InpMail from '@/shared/ui/input/mail/InpMail';
import TextInput from '@/shared/ui/input/TextInput';
import Button from '@/shared/ui/button/Button';
import { H1 } from '@/shared/ui/headings';
import Sonner from '@/shared/ui/sonner/Sonner';
import { remoteInstance } from '@/http/axios';
import ENDPOINTS from '@/http/endpoints';
import { ISonnerToast } from '@/types/global';
import { ChevronLeft } from 'lucide-react';
import clsx from '@/lib/cn';
import useRateLimit from '@/hooks/useRateLimit';
import { useRouter } from 'next/navigation';
import styles from './ForgotPassword.module.css';

/* 
All handled!!
*/
const emailSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email!')
    .nonempty('Email is required!')
    .max(75, 'Email must be at most 75 characters long!'),
});

type IEmailForm = z.infer<typeof emailSchema>;

const EmailStep = ({
  emailMutation,
  containerClassname,
  containerStyle,
}: {
  emailMutation: UseMutationResult<any, Error, IEmailForm, unknown>;
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
}) => {
  const emailForm = useForm<IEmailForm>({
    resolver: zodResolver(emailSchema),
    mode: 'onTouched',
    defaultValues: { email: '' },
  });

  const {
    control,
    formState: { errors, isSubmitting, isLoading },
  } = emailForm;

  return (
    <form
      onSubmit={emailForm.handleSubmit((data: IEmailForm) => {
        emailMutation.mutate(data);
      })}
      className={clsx(styles.formBox, containerClassname)}
      style={containerStyle}
    >
      <H1>Forgot Password</H1>
      <p>Please enter your email address to reset your password.</p>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <InpMail
            {...field}
            label='Email Address'
            placeholder='example@mail.com'
            error={errors.email?.message}
          />
        )}
      />
      <Button
        type='submit'
        text={isSubmitting ? 'Sending...' : 'Send Reset Link'}
        isLoading={isSubmitting || isLoading}
        disabled={isSubmitting || isLoading}
      />
    </form>
  );
};
/*
All handled!!
*/
const codeSchema = z.object({
  code: z
    .string()
    .nonempty('Code is required!')
    .length(6, 'Code must be exactly 6 digits.')
    .refine((val) => /^\d+$/.test(val), {
      message: 'Code must contain only numbers.',
    }),
});

type ICodeForm = z.infer<typeof codeSchema>;

const CodeStep = ({
  codeMutation,
  contentClassname,
  contentStyle,
  callback,
}: {
  codeMutation: UseMutationResult<any, Error, ICodeForm, unknown>;
  contentClassname?: string;
  contentStyle?: React.CSSProperties;
  callback: (param: number) => void;
}) => {
  const codeForm = useForm<ICodeForm>({
    resolver: zodResolver(codeSchema),
    mode: 'onTouched',
    defaultValues: { code: '' },
  });

  const {
    control,
    formState: { errors, isSubmitting, isLoading },
  } = codeForm;

  return (
    <form
      onSubmit={codeForm.handleSubmit((data: ICodeForm) => {
        codeMutation.mutate(data);
      })}
      className={clsx(styles.formBox, contentClassname)}
      style={contentStyle}
    >
      <div className={styles.headerBox}>
        <Button
          role='button'
          icon={<ChevronLeft />}
          aria-label='Go back'
          onClick={() => callback(0)}
        />

        <H1>Verify Code</H1>
      </div>
      <p>Enter the verification code sent to your email.</p>
      <Controller
        name='code'
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            type='text'
            label='Verification Code'
            placeholder='Your 6 digit reset pin'
            error={errors.code?.message}
            maxLength={6}
            onChange={(value: string | number) => {
              const input = String(value).replace(/\D/g, '').slice(0, 6);
              field.onChange(input);
            }}
            value={field.value}
          />
        )}
      />
      <Button
        type='submit'
        text={isSubmitting ? 'Verifying...' : 'Verify Code'}
        isLoading={isSubmitting || isLoading}
        disabled={isSubmitting || isLoading}
      />
    </form>
  );
};

/*  
Business logic left.
*/
const ForgotPassword = ({
  containerClassname,
  containerStyle,
}: {
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassname?: string;
  contentStyle?: React.CSSProperties;
}) => {
  const [step, setStep] = useState<0 | 1>(0);
  const [toast, setToast] = useState<ISonnerToast>({
    isOpen: false,
    title: '',
    message: '',
  });
  const router = useRouter();
  const { canAttempt, recordAttempt, attemptsLeft } = useRateLimit();

  const showToast = useCallback((title: string, message: string) => {
    setToast({ isOpen: true, title, message });
  }, []);

  const emailMutation = useMutation<any, Error, IEmailForm, unknown>({
    mutationFn: async (data: IEmailForm) => {
      const res = await remoteInstance.post(ENDPOINTS.postforgotPasswordMail, {
        email: data.email.trim(),
      });
      return res.data;
    },
    onSuccess: () => {
      showToast('Success', 'Reset link sent to your email.');
      setStep(1);
    },
    onError: () => {
      showToast('Error', 'Failed to send reset link. Please try again.');
      setStep(1);
    },
  });

  const codeMutation = useMutation<any, Error, ICodeForm, unknown>({
    mutationFn: async (data: ICodeForm) => {
      if (!canAttempt()) {
        showToast('Too many attempts', `You have ${attemptsLeft} attempts left.`);
        return;
      }

      const res = await remoteInstance.post(ENDPOINTS.postForgotPasswordCode, {
        code: parseInt(data.code),
      });
      return res.data;
    },
    onSuccess: () => {
      showToast(
        'Code verified successfully.',
        'You will be redirected to the profile page in 3 seconds.',
      );
      setTimeout(() => {
        router.push('/');
      }, 3000);
    },
    onError: () => {
      recordAttempt();
      let attemptsMessage = '';
      if (attemptsLeft === 0) {
        attemptsMessage = 'You have exceeded the maximum attempts. Please try again in 5 minutes.';
      } else {
        attemptsMessage =
          attemptsLeft % 2 === 0
            ? `Invalid code. You have ${attemptsLeft} attempts left.`
            : `Invalid code. You have ${attemptsLeft} attempt left.`;
      }
      showToast('Error', attemptsMessage);
    },
  });

  return (
    <div className={clsx(styles.mainBox, containerClassname)} style={containerStyle}>
      {step === 0 && <EmailStep emailMutation={emailMutation} />}

      {step === 1 && <CodeStep codeMutation={codeMutation} callback={() => setStep(0)} />}

      <Sonner
        title={toast.title}
        message={toast.message}
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default ForgotPassword;
