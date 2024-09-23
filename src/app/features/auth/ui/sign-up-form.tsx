'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import axiosInstance from 'app/shared/api/axiosInstanse'
import { Alert, AlertTitle, AlertDescription } from 'components/ui/alert'
import { Button } from 'components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'
import { Input } from 'components/ui/input'
import { cn } from 'lib/utils'

const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().optional(),
})

type SignUpData = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpData) => {
    try {
      await axiosInstance.post('/auth/sign-up', data)
      router.push('/sign-in')
    } catch (error) {
      console.error('Failed to sign up:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Field */}
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
            <div>
              <Input
                {...register('name')}
                placeholder="Name (optional)"
              />
            </div>
            {formState.errors && Object.keys(formState.errors).length > 0 ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>There are some validation errors, please check your input.</AlertDescription>
              </Alert>
            ) : null}
            <Button
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              type="submit"
            >
              Sign Up
            </Button>
            <div className="text-center">
              <p className="text-sm">Already have an account?</p>
              <Button
                className="mt-2 w-full"
                onClick={() => router.push('/sign-in')}
                variant="outline"
              >
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
