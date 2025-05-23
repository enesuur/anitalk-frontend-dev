'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import TextInput from '@/shared/ui/input/TextInput';
import InpMail from '@/shared/ui/input/mail/InpMail';
import TextArea from '@/shared/ui/input/textarea/TextArea';
import Button from '@/shared/ui/button/Button';
import { Send } from '@/assets/icons';
import clsx from '@/lib/cn';
import Sonner from '@/shared/ui/sonner/Sonner';
import { iconStyles } from '@/helpers';
import { ISonnerToast } from '@/types/global';
import { H2 } from '@/shared/ui/headings';
import styles from './ContactForm.module.css';
import { remoteInstance } from '@/http/axios';
import ENDPOINTS from '@/http/endpoints';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Your email address is not valid.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [toast, setToast] = useState<ISonnerToast>({
    isOpen: false,
    title: '',
    message: '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  // TODO: GLOBAL TOAST PROVIDER & ENDPOINTS ENUM CONVERSION USE EAGER WITH IMAGE API!!!

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const trimmedData = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
      };
      const res = await remoteInstance.post(ENDPOINTS.postContactForm, trimmedData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      setToast({
        isOpen: true,
        title: 'Message Sent',
        message: 'Thanks for reaching out. We’ll get back to you soon!',
        type: 'success',
      });
    },
    onError: (error) => {
      console.error('Error:', error);
      setToast({
        isOpen: true,
        title: 'Failed',
        message: 'Something went wrong. Please try again later.',
        type: 'danger',
      });
    },
  });

  return (
    <React.Fragment>
      <div className={styles.mainBox}>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className={clsx(styles.formBox)}
        >
          <H2>Let us know your thoughts!</H2>

          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextInput label='Name' {...field} error={errors.name?.message} />
            )}
          />

          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InpMail label='Email' {...field} error={errors.email?.message} />
            )}
          />

          <Controller
            name='message'
            control={control}
            render={({ field }) => (
              <TextArea label='Message' {...field} error={errors.message?.message} />
            )}
          />

          <Button
            text={mutation.isPending ? 'Sending...' : 'Send Message'}
            disabled={mutation.isPending}
            isLoading={mutation.isPending}
            iconPosition='right'
            icon={<Send {...iconStyles} />}
          />
        </form>

        <div className={styles.rightBox}>
          <H2>Let’s Talk 👋</H2>
          <p>
            Have a question, feedback, or just want to say hi? We’d love to hear from you. Fill out
            the form and we’ll get back to you as soon as possible — usually within a day.
          </p>
        </div>
      </div>

      <Sonner
        isOpen={toast.isOpen}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </React.Fragment>
  );
};

export default ContactForm;
