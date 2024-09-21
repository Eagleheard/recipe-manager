'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res && res.ok) {
      router.push('/');
    } else {
      console.error('Failed to sign in:', res?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {formState.errors.email && <p>{formState.errors.email.message}</p>}

      <input {...register('password')} type="password" placeholder="Password" />
      {formState.errors.password && <p>{formState.errors.password.message}</p>}

      <button type="submit">Sign In</button>

      <button type="button" onClick={() => signIn('google')}>
        Sign In with Google
      </button>
    </form>
  );
};
