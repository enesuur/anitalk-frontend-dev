import React, { useCallback, useState } from 'react';
import { unknown, z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InpMail from '@/shared/ui/input/mail/InpMail';
import Button from '@/shared/ui/button/Button';
import OtpModal from '@/components/modals/otp/OtpModal';
import InpPassword from '@/shared/ui/input/InpPassword';
import styles from '../_styles/SecuritySection.module.css';
import { H2, H3 } from '@/shared/ui/headings';
import { remoteInstance } from '@/http/axios';
import { Info } from 'lucide-react';
import AlertModal, { Alert } from '@/components/modals/alert/AlertModal';
import Sonner from '@/shared/ui/sonner/Sonner';

const mailSchema = z.object({
  security_email: z.string().email('Invalid email address.'),
});

type MailFormData = z.infer<typeof mailSchema>;

const MailVerification: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MailFormData>({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      security_email: '',
    },
  });

  const onSubmit = (data: MailFormData) => {
    console.log('Security Email Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
      <H2>Mail Verification</H2>
      <Controller
        name='security_email'
        control={control}
        render={({ field }) => (
          <InpMail
            label='Security Email'
            name='security_email'
            value={field.value}
            onChange={field.onChange}
            error={errors.security_email?.message}
          />
        )}
      />
      <Button type='submit' isDisabled={isSubmitting} text='Save Email' />
    </form>
  );
};

const PinSetup: React.FC = () => {
  const pinSchema = z.object({
    security_pin: z
      .string()
      .min(4, 'Pin must be at least 4 characters')
      .max(6, 'Pin must be at most 6 characters')
      .regex(/^\d+$/, 'Pin must contain only numbers'),
  });

  type PinFormData = z.infer<typeof pinSchema>;

  const [otpState, setOtpState] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    defaultValues: { security_pin: '' },
  });

  const onSubmit = (data: PinFormData) => {
    console.log('Pin Submitted:', data);
    setOtpState(true);
  };

  const handleCloseOtpModal = useCallback(() => setOtpState(false), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
      <H3>Set Security Pin</H3>
      <div className={styles.warningBox}>
        <Info />
        <p>
          <span className={styles.highlightText}>Secure </span>
          your account via pin verification.
        </p>
      </div>
      <Button
        type='submit'
        isDisabled={isSubmitting}
        text='Save Pin'
        onClick={() => setOtpState(true)}
      />
      <OtpModal isOpen={otpState} onClose={handleCloseOtpModal} />
    </form>
  );
};

interface IDeleteAccountProps {
  isModalOpen?: boolean;
  callback: (param: boolean) => void;
}

const DeleteAccount = ({ isModalOpen, callback }: IDeleteAccountProps) => {
  const deleteAccountSchema = z
    .object({
      password: z.string().min(6, 'Password must be at least 6 characters.'),
      confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: 'Passwords do not match.',
      path: ['confirm_password'],
    });

  type DeleteSchema = z.infer<typeof deleteAccountSchema>;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<DeleteSchema>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit = async (data: DeleteSchema) => {
    console.log('Deleting account with password:', data.password);
    // TODO: Prod.
    try {
      const response = await remoteInstance.delete('');
    } catch (error) {
      console.error(error, 'Security Section ---> Delete Account');
    }
  };

  const password = watch('password');
  const confirmPassword = watch('confirm_password');

  console.log(JSON.stringify({ password, confirmPassword }, null, 2));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
      <H3>Delete Account</H3>
      <div className={styles.warningBox}>
        <Info />
        <p>
          <span className={styles.highlightText}>Deleting </span>
          your account is permanent and cannot be undone.
        </p>
      </div>

      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <InpPassword
            name='password'
            label='Password'
            placeholder='Enter your password'
            value={field.value}
            onChange={field.onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        name='confirm_password'
        control={control}
        render={({ field }) => (
          <InpPassword
            name='confirm_password'
            label='Confirm Password'
            placeholder='Re-enter your password'
            value={field.value}
            onChange={field.onChange}
            error={errors.confirm_password?.message}
          />
        )}
      />

      <Button
        type='submit'
        variant='danger'
        text={'Delete Permanently'}
        onClick={() => callback(password === confirmPassword)}
        isLoading={isLoading}
        isDisabled={isSubmitting}
      />
    </form>
  );
};

const SecuritySection: React.FC = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleNotificationClose = () => {
    setIsNotificationOpen(false); // Bildirimi kapat
  };

  const handleShowNotification = () => {
    setIsNotificationOpen(true); // Bildirimi aç
  };
  return (
    <React.Fragment>
      <section>
        <div className={`container ${styles.sectionContainer}`}>
          <MailVerification />
          <PinSetup />
          <DeleteAccount isModalOpen={isAlertModalOpen} callback={setIsAlertModalOpen} />
        </div>
      </section>

      <AlertModal
        isOpen={isAlertModalOpen}
        title='Confirm Delete Action'
        text={`Your account will permanently deleted from our servers,are you sure?`}
        onClose={() => setIsAlertModalOpen(false)}
        callBack={() => setIsAlertModalOpen(false)}
      />

      <Sonner
        isOpen={isNotificationOpen}
        title={'Your account has been deleted.'}
        message={'You will be redirected to homepage in 3 seconds.'}
        onClose={handleNotificationClose}
      />

      <Button onClick={handleShowNotification} text='Dummy button for soner abi testing' />
    </React.Fragment>
  );
};

export default React.memo(SecuritySection);
