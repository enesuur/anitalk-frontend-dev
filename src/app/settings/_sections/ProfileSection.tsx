'use client';
import React, { useState } from 'react';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/shared/ui/button/Button';
import TextInput from '@/shared/ui/input/TextInput';
import TextArea from '@/shared/ui/input/textarea/TextArea';
import ImageInput from '@/shared/ui/input/ImageInput';
import styles from '../_styles/ProfileSection.module.css';
import { H2 } from '@/shared/ui/headings';
import { remoteInstance } from '@/http/axios';
import { Profile as ProfileIcon, Date as DateIcon, Profile, Info } from '@/assets/icons';
import { Eye, Flag, Baby, PencilLine, AlertCircle, icons } from 'lucide-react';
import { iconStyles } from '@/helpers';
import ReactFlagsSelect from 'react-flags-select';
import Image from 'next/image';

interface IUsernameProps {
  username: string;
}
const UsernameForm = ({ username }: IUsernameProps) => {
  const usernameSchema = z.object({
    username: z.string(),
  });

  type UsernameSchema = z.infer<typeof usernameSchema>;

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username },
  });

  const onSubmit = (data: UsernameSchema) => {
    console.log('Username updated:', data);
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <div className={styles.leftBox}>
          <div className={styles.labelBox}>
            <ProfileIcon {...iconStyles} />
            <span>Username</span>
          </div>
          <Controller
            name='username'
            control={control}
            render={() => (
              <TextInput
                value={username}
                label={'Username'}
                name={'username'}
                disabled
                readOnly
                className='cursor-disabled'
                hideLabel={true}
                containerClassName={styles.inpText}
              />
            )}
          />
        </div>
        <Button text='Update' className={styles.rightBox} />
      </form>

      {formState.errors?.username && (
        <div className={styles.errorContainer}>
          <AlertCircle {...iconStyles} />
          <span>{formState.errors.username?.message}</span>
        </div>
      )}
    </div>
  );
};

interface IDisplayForm {
  display_name: string | null;
}

const displayNameSchema = z.object({
  display_name: z.string().min(2).max(50).nullable(),
});

type DisplayNameSchema = z.infer<typeof displayNameSchema>;

const DisplayNameForm = ({ display_name }: IDisplayForm) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<DisplayNameSchema>({
    mode: 'all',
    resolver: zodResolver(displayNameSchema),
    defaultValues: {
      display_name: display_name ?? '',
    },
  });

  const onSubmit = async (data: DisplayNameSchema) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 saniye bekle
      console.log('Display name updated:', data);
      // const response = await remoteInstance.post('');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <div className={styles.leftBox}>
          <div className={styles.labelBox}>
            <ProfileIcon width={16} height={16} />
            <span>Display Name</span>
          </div>
          <Controller
            name='display_name'
            control={control}
            render={({ field }) => (
              <TextInput
                name='display_name'
                value={field.value}
                onChange={field.onChange}
                error={errors.display_name?.message}
                hideLabel={true}
                showError={false}
                placeholder={'Cool nick!'}
                containerClassName={styles.inpText}
              />
            )}
          />
        </div>

        <Button
          type='submit'
          text='Update'
          className={styles.rightBox}
          disabled={isSubmitting}
          isLoading={isLoading}
        />
      </form>

      {errors?.display_name && (
        <div className={styles.errorContainer}>
          <AlertCircle width={16} height={16} />
          <span>{errors.display_name.message}</span>
        </div>
      )}
    </div>
  );
};

interface ICountryCode {
  country: string;
}

const CountryForm = ({ country }: ICountryCode) => {
  const countrySchema = z.object({
    country: z.string().min(1, 'Country is required').nullable(),
  });

  type CountrySchema = z.infer<typeof countrySchema>;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CountrySchema>({
    resolver: zodResolver(countrySchema),
    defaultValues: { country },
  });

  // Use formState for reading the form value
  const { dirtyFields } = useFormState({
    control,
  });

  const onSubmit = (data: CountrySchema) => {
    console.log('Country updated:', data);
    // Form gönderildiğinde yapılacak işlemler
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.verticalBox}>
      <div>
        <div className={styles.labelBox}>
          <span>Country</span>
        </div>
        <Controller
          name='country'
          control={control}
          render={({ field }) => (
            <div className={styles.inputContainer}>
              <ReactFlagsSelect
                selected={field.value || ''}
                onSelect={(code) => {
                  setValue('country', code);
                  field.onChange(code);
                }}
                className={styles.flagSelect}
                showSelectedLabel={true}
              />
              {errors.country && (
                <div className={styles.errorContainer}>
                  <span>{errors.country.message}</span>
                </div>
              )}
            </div>
          )}
        />
      </div>
      <Button text='Update Country' isLoading={isSubmitting} disabled={isSubmitting} />
    </form>
  );
};

interface IBiographyProps {
  biography: string | null;
}

const BiographyForm = ({ biography }: IBiographyProps) => {
  const biographySchema = z.object({
    biography: z
      .string()
      .min(10, 'Biography must be at least 10 characters.')
      .max(500, 'Biography cannot exceed 500 characters.')
      .nullable(),
  });
  type BiographySchema = z.infer<typeof biographySchema>;
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    resolver: zodResolver(biographySchema),
    defaultValues: { biography },
  });

  const onSubmit = (data: BiographySchema) => {
    console.log('Biography updated:', data);
  };

  return (
    <div className={styles.verticalBox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={styles.labelBox}>
            <PencilLine {...iconStyles} />
            <span>Biography</span>
          </div>
          <Controller
            name='biography'
            control={control}
            render={({ field }) => (
              <Controller
                name='biography'
                control={control}
                render={({ field }) => (
                  <TextArea
                    name='biography'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.biography?.message}
                    placeholder='Who does not like dancing?'
                    label='People are being curios creatures, let them know you :)'
                  />
                )}
              />
            )}
          />
        </div>
        <Button
          text='Update'
          isLoading={isLoading}
          disabled={isSubmitting}
          style={{
            width: '100%',
            marginTop: '24px',
          }}
        />
      </form>
    </div>
  );
};

interface IProfileImageForm {
  profile_img_url: string | null;
  setProfileImage: () => void;
}

const ProfileImageForm = ({ profile_img_url, setProfileImage }: IProfileImageForm) => {
  const profileImageSchema = z.object({
    profile_img_url: z.string().nullable().optional(),
  });
  type ProfileImageSchema = z.infer<typeof profileImageSchema>;

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(profileImageSchema),
    defaultValues: { profile_img_url: profile_img_url },
  });

  const onSubmit = (data: ProfileImageSchema) => {
    console.log('Profile image updated:', data);
  };

  const handleImageSelect = (_, previewUrl: string) => {
    setProfileImage(previewUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.verticalBox}>
      <div className={styles.horizontalBox}>
        <div className={styles.leftBox}>
          <picture>
            <Image
              src={'/img/avatar.webp'}
              alt='Profile Picture'
              className={styles.avatarBox}
              fill={true}
              priority={false}
              loading={'lazy'}
              quality={1}
            />
          </picture>
          <span>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
        </div>
        <ImageInput onImageSelect={handleImageSelect} />
      </div>
    </form>
  );
};

interface ICoverImageProps {
  cover_img_url: string | null;
  setCoverImage: () => void;
}

const CoverImageForm = ({ cover_img_url, setCoverImage }: ICoverImageProps) => {
  const coverImageSchema = z.object({
    cover_img_url: z.string().nullable().optional(),
  });

  type CoverImageSchema = z.infer<typeof coverImageSchema>;
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(coverImageSchema),
    defaultValues: { cover_img_url: cover_img_url },
  });

  const onSubmit = (data: CoverImageSchema) => {
    console.log('Cover image updated:', data);
  };

  const handleImageSelect = (_, previewUrl: string) => {
    setCoverImage(previewUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Cover Image</h2>
      <div>
        <div>
          <picture>
            <img src={cover_img_url || '/img/bg-cover.webp'} alt='Cover Image' className='cover' />
          </picture>
          <span>Must be JPEG, PNG, or GIF and cannot exceed 10MB.</span>
        </div>
        <ImageInput onImageSelect={handleImageSelect} />
      </div>
      <Button text='Update Cover Image' />
    </form>
  );
};

interface IProfileSectionProps {
  username: string;
  cover_img_url: string | null;
  profile_img_url: string | null;
  generation: number;
  country: string;
  biography: string | null;
}
/*
TODO: Default props will be removed in production release.
*/
const ProfileSection = ({
  username = 'baladriel',
  cover_img_url = null,
  profile_img_url = null,
  display_name = 'test',
  generation = 1,
  country = 'Turkey',
  biography = null,
}: IProfileSectionProps) => {
  const [profileImage, setProfileImage] = useState(profile_img_url ?? null);
  const [coverImage, setCoverImage] = useState(cover_img_url ?? null);

  return (
    <section>
      <div className={'container'}>
        <H2>Profile Settings</H2>
        <div className={styles.profileBox}>
          <UsernameForm username={username} />
          <DisplayNameForm display_name={display_name} />
          <CountryForm country={country} />
          <BiographyForm biography={biography} />
          <ProfileImageForm
            profile_img_url={profileImage || 'img/avatar.webp'}
            setProfileImage={() => setProfileImage}
          />
          <CoverImageForm
            cover_img_url={coverImage || '/img/bg-cover.webp'}
            setCoverImage={() => setCoverImage()}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
