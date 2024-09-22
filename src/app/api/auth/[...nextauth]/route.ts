import { authOptions } from '@/app/shared/config/nextAuthOptions';
import NextAuth from 'next-auth';

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

export default NextAuth(authOptions);
