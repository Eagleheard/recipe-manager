'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/shared/api/axiosInstanse';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

type SignUpData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      await axiosInstance.post('/auth/sign-up', data);
      router.push('/sign-in');
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {formState.errors.email && <p>{formState.errors.email.message}</p>}

      <input {...register('password')} type="password" placeholder="Password" />
      {formState.errors.password && <p>{formState.errors.password.message}</p>}

      <input {...register('name')} placeholder="Name (optional)" />

      <button type="submit">Sign Up</button>
    </form>
  );
};
