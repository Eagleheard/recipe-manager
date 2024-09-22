import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RecipeList } from '../entities/recipe/ui/recipe-list/recipe-list.component';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../shared/config/nextAuthOptions';

export default async function RecipesPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      redirect('/sign-in');
    }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <Link href="/recipes/create">
          <Button>Create New Recipe</Button>
        </Link>
      </div>
      <RecipeList />
    </div>
  );
}
