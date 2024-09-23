import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { RecipeDetail } from '../../entities/recipe/ui/recipe-details/recipe-details.component'
import { authOptions } from '../../shared/config/nextAuthOptions'

export default async function RecipePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/sign-in')
  }

  return <RecipeDetail />
}
