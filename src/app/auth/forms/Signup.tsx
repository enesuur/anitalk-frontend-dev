'use client';
import React, { useState, useCallback } from 'react';
import Sonner from '@/shared/ui/sonner/Sonner';
import Cookies from 'js-cookie';
import InpMail from '@/shared/ui/input/mail/InpMail';
import InpPassword from '@/shared/ui/input/InpPassword';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISonnerToast } from '@/types/global';
import { useMutation } from '@tanstack/react-query';
import { remoteInstance } from '@/http/axios';
import ENDPOINTS from '@/http/endpoints';
import { H1 } from '@/shared/ui/headings';
import Button from '@/shared/ui/button/Button';
import clsx from '@/lib/cn';
import Divider from '@/shared/ui/hr/Divider';
import GoogleButton from '@/shared/ui/btn-google/GoogleButton';
import { Rabbit, Key } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.css';

const signupSchema = z
  .object({
    email: z.string().email('Your email is invalid!').nonempty('Email is required!'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long!')
      .nonempty('Password is required!'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long!')
      .nonempty('Confirm password is required!'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

interface ISignupForm {
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassname?: string;
  contentStyle?: React.CSSProperties;
}

type IFormData = z.infer<typeof signupSchema>;

const SignupForm: React.FC<ISignupForm> = ({
  containerClassname,
  containerStyle,
  contentClassname,
  contentStyle,
}) => {
  const [toast, setToast] = useState<ISonnerToast>({
    isOpen: false,
    message: '',
    title: '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleToast = useCallback((message: string, title: string) => {
    setToast({
      isOpen: true,
      message,
      title,
    });
  }, []);

  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: async (data: IFormData) => {
      const response = await remoteInstance.post(ENDPOINTS.postSignup, {
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token, {
        expires: 30,
        path: '/',
        secure: true,
        sameSite: 'Lax',
      });
      handleToast(
        'Signup successful! You will be redirected to home page in 3 seconds.',
        'Success',
      );
      setTimeout(() => {
        router.push('/');
      }, 3000);
      reset();
    },
    onError: (error: Error) => {
      console.error('Error:', error);
      handleToast(error.message, 'Error');
    },
  });

  const onSubmit = (data: IFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className={clsx(containerClassname, styles.formContainer)} style={containerStyle}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(styles.formBox, contentClassname)}
        style={contentStyle}
      >
        <H1 className={styles.headerText}>Sign up</H1>
        <p>Hey, welcome! Join us and have fun!</p>
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <InpMail
              {...field}
              label='Email Address'
              placeholder='Enter your email'
              error={errors.email?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <InpPassword
              {...field}
              label='Password'
              value={field.value}
              onChange={field.onChange}
              placeholder='Enter your password'
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => (
            <InpPassword
              {...field}
              label='Confirm Password'
              placeholder='Re-enter your password'
              value={field.value}
              onChange={field.onChange}
              error={errors.confirmPassword?.message as string | undefined}
            />
          )}
        />

        <Button
          type='submit'
          text={isSubmitting ? 'Signing up...' : 'Sign Up'}
          isLoading={isSubmitting}
          disabled={isSubmitting || isLoading}
          className={styles.btnSubmit}
        />
        <Divider text={'or'} containerClassname={styles.dividerBox} />
        <GoogleButton
          containerClassname={styles.btnGoogle}
          disabled={true}
          onClick={() => console.log('Not implemented yet!')}
        />
        <div className={styles.footerBox}>
          <Link href={'/auth/forgot-password'} className={styles.footerLeft}>
            <Key />
            <span>Forgot password?</span>
          </Link>

          <Link href={'/auth/sign-in'} className={styles.footerRight}>
            <Rabbit />
            <span>Sign in</span>
          </Link>
        </div>
      </form>

      <Sonner
        title={toast.title}
        message={toast.message}
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default React.memo(SignupForm);
