import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import RecipesPage from './recipes/page'
import { authOptions } from './shared/config/nextAuthOptions'
import HeaderComponent from './shared/ui/header/header.component'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div>
      <HeaderComponent session={session} />
      <main className="p-4">
        <RecipesPage />
      </main>
    </div>
  )
}
