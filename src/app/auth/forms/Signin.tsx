'use client';
import React, { useState, useCallback } from 'react';
import Sonner from '@/shared/ui/sonner/Sonner';
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
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const signinSchema = z.object({
  email: z.string().email('Your email is invalid!').nonempty('Email is required!'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long!')
    .nonempty('Password is required!'),
});

interface ISigninForm {
  containerClassname?: string;
  containerStyle?: React.CSSProperties;
  contentClassname?: string;
  contentStyle?: React.CSSProperties;
}

type IFormData = z.infer<typeof signinSchema>;

const SigninForm: React.FC<ISigninForm> = ({
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
    resolver: zodResolver(signinSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleToast = useCallback((message: string, title: string) => {
    setToast({ isOpen: true, message, title });
  }, []);

  /*Hooks*/
  const router = useRouter();

  const signinMutation = useMutation({
    mutationFn: async (data: IFormData) => {
      const response = await remoteInstance.post(ENDPOINTS.postSignin, {
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
      handleToast(' You will be redirected to home page in 3 seconds.', 'Success');
      setTimeout(() => {
        router.push('/');
      }, 3000);
      reset();
    },
    onError: (error) => {
      console.error('Error:', error);
      handleToast(error.message, 'Error');
    },
  });

  const onSubmit = (data: IFormData) => {
    signinMutation.mutate(data);
  };

  return (
    <div className={clsx(containerClassname, styles.formContainer)} style={containerStyle}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(styles.formBox, contentClassname)}
        style={contentStyle}
      >
        <H1 className={styles.headerText}>Sign in</H1>
        <p>Welcome back! Log in to continue.</p>

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

        <Button
          type='submit'
          text={isSubmitting ? 'Signing in...' : 'Sign In'}
          isLoading={isLoading}
          disabled={isSubmitting || isLoading}
          className={styles.btnSubmit}
        />

        <Divider text='or' containerClassname={styles.dividerBox} />

        <GoogleButton containerClassname={styles.btnGoogle} disabled={true} />

        <div className={styles.footerBox}>
          <Link href='/auth/forgot-password' className={styles.footerLeft}>
            <Key />
            <span>Forgot password?</span>
          </Link>

          <Link href='/auth/sign-up' className={styles.footerRight}>
            <Rabbit />
            <span>Sign up</span>
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

export default React.memo(SigninForm);
