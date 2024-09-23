'use client'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { redirect } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Button } from 'components/ui/button'

export default async function HeaderComponent({ session }: { session: Session }) {
  if (!session) {
    redirect('/sign-in')
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/sign-in' })
  }

  return (
    <header className="bg-white border-b border-gray-300 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-black">Welcome to Recipes</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gray-200 text-black hover:bg-gray-300 flex items-center space-x-2 px-4 py-2">
            <span>{session.user?.name || session.user?.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="bg-gray-200 cursor-pointer hover:bg-gray-300"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
