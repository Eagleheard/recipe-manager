import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials) return null;
  
          const { email, password } = credentials;
          const user = await prisma.user.findUnique({
            where: { email },
          });
  
          if (!user || !user.password) {
            return null;
          }
  
          const isValidPassword = bcrypt.compareSync(password, user.password);
  
          if (isValidPassword) {
            return { id: user.id, name: user.name, email: user.email };
          } else {
            throw new Error('Invalid credentials');
          }
        },
      }),
    ],
    session: {
      strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }

        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user = {
            name: token.name,
            email: token.email,
          };
        }
  
        return session;
      },
    },
    pages: {
      signIn: '/sign-in',
    },
    cookies: {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
          },
        },
      },
  };
  