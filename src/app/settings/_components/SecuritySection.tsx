import React, { useCallback, useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InpMail from '@/shared/ui/input/mail/InpMail';
import Button from '@/shared/ui/button/Button';
import OtpModal from "@/components/modals/otp/OtpModal";
import styles from '../_styles/SecuritySection.module.css';

const securitySchema = z.object({
  security_email: z.string().email('Invalid email address'),
  security_pin: z
    .string()
    .min(4, 'Pin must be at least 4 characters')
    .max(6, 'Pin must be at most 6 characters')
    .regex(/^\d+$/, 'Pin must contain only numbers'),
});

type SecurityFormData = z.infer<typeof securitySchema>;

const SecuritySection: React.FC = () => {
  const [otpState,setOtpState] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    mode: 'all',
    defaultValues: {
      security_email: '',
      security_pin: '',
    },
  });

  const onSubmit = (data: SecurityFormData) => {
    console.log('Security Info:', data);
  };



  const openModal = useCallback(() => {
    setOtpState(true);
  }, []);

  const handleCloseOtpModal = useCallback(() => {
    setOtpState(false);
  }, []);

  return (
    <>
        <section>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
          <h2 className='setting-text-header'>Mail Verification</h2>
          <Controller
            name='security_email'
            control={control}
            render={({ field }) => (
              <InpMail
                label={'Security Email'}
                name={'security_email'}
                value={field.value}
                onChange={field.onChange}
                error={errors.security_email?.message}
              />
            )}
          />

          <Button
            type={'submit'}
            isDisabled={isSubmitting}
            isLoading={isLoading}
            text={'Save Security Info'}
          />
        </form>

        {/* Set Pin Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
          <h2 className='setting-text-header'>Set Pin</h2>
          {/* <Controller
            name="security_pin"
            control={control}
            render={({ field }) => (
              <InputPin
                label="Set your Pin"
                name="security_pin"
                value={field.value}
                onChange={field.onChange}
                error={errors.security_pin?.message}
              />
            )}
          /> */}

          <Button
            type={'submit'}
            isDisabled={isSubmitting}
            isLoading={isLoading}
            onClick={()=> setOtpState(true)}
            text={'Save Pin'}
          />
        </form>
      </div>
    </section>

    <OtpModal 
        isOpen={otpState} 
        onClose={handleCloseOtpModal}
      />
    </>
  );
};

export default React.memo(SecuritySection);
