'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SignInResources } from './sign-in-form.resources'

import { Alert, AlertTitle, AlertDescription } from 'components/ui/alert'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Input } from 'components/ui/input'
import { cn } from 'lib/utils'

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

type SignInData = z.infer<typeof signInSchema>

export const SignInForm = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInData) => {
    setError(null)
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (res && res.ok) {
      router.push('/')
    } else {
      setError(res?.error || 'Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                {...register('email')}
                className={cn(formState.errors.email && 'border-red-500')}
                placeholder="Email"
              />
              {formState.errors.email ? <p className="text-sm text-red-500">{formState.errors.email.message}</p> : null}
            </div>

            <div>
              <Input
                {...register('password')}
                className={cn(formState.errors.password && 'border-red-500')}
                placeholder="Password"
                type="password"
              />
              {formState.errors.password ? <p className="text-sm text-red-500">{formState.errors.password.message}</p> : null}
            </div>

            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              type="submit"
            >
              {SignInResources.signInLabel}
            </Button>
            <div className="text-center">
              <p className="text-sm">{SignInResources.signUpLinkText}</p>
              <Link href="/sign-up">
                <Button
                  className="mt-2 w-full"
                  variant="outline"
                >
                  {SignInResources.signUpLabel}
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
