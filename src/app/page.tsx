import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './shared/config/nextAuthOptions';

//import { RecipeList } from '@/features/recipe/ui/RecipeList';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name || session.user?.email}!</h1>
      {/* <RecipeList /> */}
    </div>
  );
}
