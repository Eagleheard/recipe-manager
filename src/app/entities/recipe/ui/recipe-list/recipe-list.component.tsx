'use client';

import { useRecipes } from '../../api/recipe.hook';
import { Input } from '@/components/ui/input';
import { useQueryParams } from '@/app/shared/hooks/query-params.hook';
import { Button } from '@/components/ui/button';

export const RecipeList = () => {
  const {queryParams, updateQueryParams} = useQueryParams({
    search: String,
    ingredients: String,
    tags: String,
  });
  
  const { data: recipes, isLoading, error, refetch } = useRecipes({
    search: queryParams.search,
    ingredients: queryParams.ingredients,
    tags: queryParams.tags,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching recipes</div>;

  return (
    <div className="space-y-4">
      <Input
        type="text"
        value={queryParams.search}
        onChange={(e) => updateQueryParams({ ...queryParams, search: e.target.value })}
        placeholder="Search by recipe name..."
      />

      <Input
        type="text"
        value={queryParams.ingredients}
        onChange={(e) => updateQueryParams({ ...queryParams, ingredients: e.target.value })}
        placeholder="Filter by ingredients (comma-separated)"
      />

      <Input
        type="text"
        value={queryParams.tags}
        onChange={(e) => updateQueryParams({ ...queryParams, tags: e.target.value })}
        placeholder="Filter by tags (comma-separated)"
      />

      <Button onClick={() => refetch()}>Filter</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe: any) => (
          <div key={recipe.id} className="border p-4 rounded-lg">
            <h2 className="font-bold">{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>{recipe.ingredients.join(', ')}</p>
            <p>{recipe.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
