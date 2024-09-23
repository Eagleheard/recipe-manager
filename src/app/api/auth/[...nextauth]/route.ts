import NextAuth from 'next-auth'

import { authOptions } from 'app/shared/config/nextAuthOptions'

export const GET = NextAuth(authOptions)
export const POST = NextAuth(authOptions)

export default NextAuth(authOptions)