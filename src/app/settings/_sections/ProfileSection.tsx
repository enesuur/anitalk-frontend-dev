'use client';
import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/shared/ui/button/Button';
import TextInput from '@/shared/ui/input/TextInput';
import TextArea from '@/shared/ui/input/textarea/TextArea';
import ImageInput from '@/shared/ui/input/ImageInput';
import { H2, H3 } from '@/shared/ui/headings';
import Sonner from '@/shared/ui/sonner/Sonner';
import { remoteInstance } from '@/http/axios';
import { Profile as ProfileIcon } from '@/assets/icons';
import { Baby, PencilLine, AlertCircle } from 'lucide-react';
import { iconStyles } from '@/helpers';
import ReactFlagsSelect from 'react-flags-select';
import Image from 'next/image';
import { ISonnerToast } from '@/types/global';
import ENDPOINTS from '@/http/endpoints';
import { useMutation } from '@tanstack/react-query';
import { filterSwears } from '@/helpers';
import { AxiosError } from 'axios';
import styles from '../_styles/ProfileSection.module.css';
import { PLACE_HOLDERS } from '@/helpers/constants';

interface IUsernameProps {
  username: string;
  toastHandler: (title: string, message: string) => void;
}

const usernameSchema = z.object({
  username: z
    .string()
    .nonempty('Username is required')
    .max(15, 'Username must be at most 15 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores are allowed'),
});

type UsernameSchema = z.infer<typeof usernameSchema>;

const UsernameForm = ({ username, toastHandler }: IUsernameProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-username'],
    mutationFn: async (data: UsernameSchema) => {
      if (!filterSwears(data.username, 'en')) {
        const res = await remoteInstance.post(ENDPOINTS.postUsername, {
          username: data.username,
        });
        return res.data;
      }
      throw new Error('Have respect dude!');
    },
    onSuccess: () => {
      toastHandler('Success', 'Username updated successfully');
    },
    onError: (error: AxiosError) => {
      console.error('Error', error);
      toastHandler('Error', 'Failed to update username.');
    },
  });

  const onSubmit = (data: UsernameSchema) => {
    mutate(data);
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
            render={({ field }) => (
              <TextInput
                {...field}
                label='username'
                hideLabel={true}
                containerClassName={styles.inpText}
              />
            )}
          />
        </div>

        <Button
          text='Update'
          aria-label='Update Form Button'
          className={styles.rightBox}
          isLoading={isPending}
          isDisabled={isSubmitting || isPending}
        />
      </form>

      {errors.username && (
        <div className={styles.errorContainer}>
          <AlertCircle {...iconStyles} />
          <span>{errors.username.message}</span>
        </div>
      )}
    </div>
  );
};

interface IDisplayForm {
  display_name: string | null;
  toastHandler: (title: string, message: string) => void;
}

const displayNameSchema = z.object({
  display_name: z.string().min(2).max(20).nullable(),
});

type DisplayNameSchema = z.infer<typeof displayNameSchema>;

const DisplayNameForm = ({ display_name, toastHandler }: IDisplayForm) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DisplayNameSchema>({
    mode: 'onTouched',
    resolver: zodResolver(displayNameSchema),
    defaultValues: {
      display_name: display_name ?? '',
    },
  });

  const mutation = useMutation({
    mutationKey: ['update-displayname'],
    mutationFn: async (data: DisplayNameSchema) => {
      if (!data?.display_name) return;

      if (filterSwears(data?.display_name, 'en')) {
        const res = await remoteInstance.post(ENDPOINTS.postDisplayName, {
          display_name: data.display_name,
        });
        return res.data;
      }
      throw Error;
    },
    onSuccess: () => {
      toastHandler('Success', 'Display name updated!');
    },
    onError: (error: AxiosError) => {
      console.error('Update failed:', error);
      toastHandler('Error', 'Failed to update display name.');
    },
  });

  const onSubmit = (data: DisplayNameSchema) => {
    if (data.display_name) {
      mutation.mutate({ display_name: data.display_name });
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
        <div className={styles.leftBox}>
          <div className={styles.labelBox}>
            <ProfileIcon width={20} height={20} />
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
                placeholder='Cool nick!'
                containerClassName={styles.inpText}
              />
            )}
          />
        </div>

        <Button
          type='submit'
          text='Update'
          className={styles.rightBox}
          disabled={mutation.isPending}
          isLoading={mutation.isPending}
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
  toastHandler: (title: string, message: string) => void;
}

const countrySchema = z.object({
  country: z.string().min(1, 'Country is required').nullable(),
});

type CountrySchema = z.infer<typeof countrySchema>;

const CountryForm = ({ country, toastHandler }: ICountryCode) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<CountrySchema>({
    resolver: zodResolver(countrySchema),
    defaultValues: { country },
  });

  const mutation = useMutation({
    mutationFn: async (data: CountrySchema) => {
      if (!data.country) return;
      const res = await remoteInstance.post(ENDPOINTS.postUserCountry, {
        country: data.country,
      });
      return res.data;
    },
    onSuccess: () => {
      toastHandler('Success', 'Country updated successfully!');
    },
    onError: (error: AxiosError) => {
      console.error('Update failed:', error);
      toastHandler('Error', 'Failed to update country.');
    },
  });

  const onSubmit = (data: CountrySchema) => {
    mutation.mutate(data);
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
      <Button text='Update Country' isLoading={isLoading} disabled={isSubmitting} />
    </form>
  );
};

interface IBiographyProps {
  biography: string | null;
  toastHandler: (title: string, message: string) => void;
}

const BiographyForm = ({ biography, toastHandler }: IBiographyProps) => {
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
    formState: { errors, isSubmitting, isLoading },
  } = useForm<BiographySchema>({
    resolver: zodResolver(biographySchema),
    defaultValues: { biography },
  });

  const mutation = useMutation({
    mutationFn: async (data: BiographySchema) => {
      if (!data.biography) return;
      if (filterSwears(data.biography, 'en')) {
        const res = await remoteInstance.post(ENDPOINTS.updateBiography, {
          biography: data.biography,
        });
        return res.data;
      }
      throw new Error('Have a respect dude!');
    },
    onSuccess: () => {
      toastHandler('Success', 'Biography updated successfully!');
    },
    onError: (error: AxiosError) => {
      console.error('Update failed:', error);
      toastHandler('Error', 'Failed to update biography.');
    },
  });

  const onSubmit = (data: BiographySchema) => {
    mutation.mutate(data);
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
              <TextArea
                name='biography'
                value={field.value}
                onChange={field.onChange}
                error={errors.biography?.message}
                placeholder='Who does not like dancing?'
                label='People are curious creatures, let them know you :)'
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
  setProfileImage: (url: string | null) => void;
  toastHandler: (title: string, message: string) => void;
}

const profileImageSchema = z.object({
  profile_img_url: z.string().min(1, 'Profile image URL cannot be empty').nullable(),
});

type ProfileImageSchema = z.infer<typeof profileImageSchema>;

const ProfileImageForm = ({
  profile_img_url,
  setProfileImage,
  toastHandler,
}: IProfileImageForm) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isLoading, errors },
  } = useForm<ProfileImageSchema>({
    resolver: zodResolver(profileImageSchema),
    defaultValues: {
      profile_img_url: profile_img_url || '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ProfileImageSchema) => {
      if (!data.profile_img_url) {
        throw new Error('No image selected.');
      }
      const formData = new FormData();
      formData.append('file', data.profile_img_url);
      const res = await remoteInstance.post(ENDPOINTS.uploadProfileImage, formData);
      return res.data;
    },
    onSuccess: () => {
      toastHandler('Success', 'Profile image updated successfully!');
    },
    onError: (error: AxiosError) => {
      console.error('Update failed:', error);
      toastHandler('Error', 'Failed to update profile image.');
    },
  });

  const onSubmit = (data: ProfileImageSchema) => {
    if (!data.profile_img_url) {
      toastHandler('Error', 'Please select a valid image.');
      return;
    }
    mutation.mutate(data);
  };

  const handleImageSelect = (_: File, previewUrl: string) => {
    setProfileImage(previewUrl);
  };

  return (
    <div>
      <H3>Profile Image</H3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.verticalBox}>
        <div className={styles.horizontalBox}>
          <div className={`${styles.leftBox} ${styles.verticalBox}`}>
            <picture className={styles.avatarPicture}>
              <Image
                src={profile_img_url || PLACE_HOLDERS.avatar_url}
                alt={'Your avatar picture'}
                className={styles.avatarBox}
                fill
                loading='lazy'
                quality={1}
              />
            </picture>
            <span className={styles.imageGuideline}>
              Must be JPEG, PNG, or GIF and cannot exceed 10MB.
            </span>
          </div>

          <Controller
            name='profile_img_url'
            control={control}
            render={({ field }) => (
              <ImageInput
                errorMessage={errors?.profile_img_url?.message}
                onImageSelect={(file: File | null, previewUrl: string | null) => {
                  field.onChange(previewUrl);
                  handleImageSelect(file, previewUrl);
                }}
              />
            )}
          />
        </div>

        <Button text='Update' type='submit' disabled={isSubmitting} isLoading={isLoading} />
      </form>
    </div>
  );
};

interface ICoverImageProps {
  cover_img_url: string | null;
  setCoverImage: (url: string | null) => void;
  toastHandler: (title: string, message: string) => void;
}

const coverImageSchema = z.object({
  cover_img_url: z.string().min(1, 'Cover image URL cannot be empty'),
});

type CoverImageSchema = z.infer<typeof coverImageSchema>;

const CoverImageForm = ({ cover_img_url, setCoverImage, toastHandler }: ICoverImageProps) => {
  const mutation = useMutation({
    mutationKey: ['update-cover-image'],
    mutationFn: async (data: CoverImageSchema) => {
      const { cover_img_url } = data;
      const response = await remoteInstance.post(ENDPOINTS.postUserCoverImage, { cover_img_url });
      return response.data;
    },
    onSuccess: () => {
      toastHandler('Success', 'Cover image updated successfully');
    },
    onError: (error: unknown) => {
      console.error('Error updating cover image:', error);
      toastHandler('Error', 'Failed to update cover image.');
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CoverImageSchema>({
    resolver: zodResolver(coverImageSchema),
    defaultValues: {
      cover_img_url: cover_img_url || '',
    },
  });

  const onSubmit = (data: CoverImageSchema) => {
    mutation.mutate(data);
  };

  const handleImageSelect = (_: File | null, previewUrl: string | null) => {
    setCoverImage(previewUrl);
  };

  return (
    <div>
      <H3>Cover Image</H3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.verticalBox}>
        <div>
          <div>
            <picture className={styles.coverPicture}>
              <Image
                src={cover_img_url || PLACE_HOLDERS.background_cover_url}
                alt='Your cover image photo'
                className={styles.coverBox}
                fill
                loading='lazy'
                quality={1}
              />
            </picture>
            <p style={{ textAlign: 'center', margin: '12px 0' }}>
              Must be JPEG, PNG, or GIF and cannot exceed 5MB.
            </p>
          </div>

          <Controller
            name='cover_img_url'
            control={control}
            render={({ field }) => (
              <ImageInput
                errorMessage={errors?.cover_img_url?.message}
                onImageSelect={(file: File | null, previewUrl: string | null) => {
                  field.onChange(previewUrl);
                  handleImageSelect(file, previewUrl);
                }}
              />
            )}
          />
        </div>
        <Button text='Update Cover Image' isLoading={mutation.isPending} disabled={isSubmitting} />
      </form>
    </div>
  );
};

interface IGenerationProps {
  generation: number;
}

const GenerationSection: React.FC<IGenerationProps> = ({ generation }: IGenerationProps) => {
  return (
    <div className={styles.generationBox}>
      <div className={styles.labelBox}>
        <Baby {...iconStyles} />
        <span>Your Generation</span>
      </div>
      <span>{generation}</span>
    </div>
  );
};

interface IProfileSectionProps {
  username: string;
  cover_img_url: string | null;
  profile_img_url: string | null;
  display_name: string | null;
  generation: number;
  country: string;
  biography: string | null;
}

/* 
TODO: Wrap toast component in global later on use it once.
*/
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
  const [profileImage, setProfileImage] = useState<string | null>(profile_img_url || null);
  const [coverImage, setCoverImage] = useState<string | null>(cover_img_url || null);
  const [toast, setToast] = useState<ISonnerToast>({
    isOpen: false,
    title: '',
    message: '',
  });

  const showToast = useCallback((title: string, message: string) => {
    setToast({ isOpen: true, title, message });
  }, []);

  return (
    <section>
      <div className={'container'}>
        <H2>Profile Settings</H2>
        <div className={styles.profileBox}>
          <UsernameForm username={username} toastHandler={showToast} />
          <GenerationSection generation={generation} />
          <DisplayNameForm display_name={display_name} toastHandler={showToast} />
          <CountryForm country={country} toastHandler={showToast} />
          <BiographyForm biography={biography} toastHandler={showToast} />
          <ProfileImageForm
            profile_img_url={profileImage}
            setProfileImage={setProfileImage}
            toastHandler={showToast}
          />
          <CoverImageForm
            cover_img_url={coverImage}
            setCoverImage={setCoverImage}
            toastHandler={showToast}
          />
        </div>
      </div>

      <Sonner
        title={toast.title}
        message={toast.message}
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  );
};

export default ProfileSection;
