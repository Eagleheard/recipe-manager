import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { RecipeForm } from 'app/entities/recipe/ui/recipe-form/recipe-form.component'
import { authOptions } from 'app/shared/config/nextAuthOptions'

export default async function EditRecipePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/sign-in')
  }

  return <RecipeForm />
}
