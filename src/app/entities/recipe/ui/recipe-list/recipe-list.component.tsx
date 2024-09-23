'use client'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { uniq } from 'lodash'
import { useRouter } from 'next/router'

import { useRecipes, useGetAllRecipes } from '../../api/recipe.hook'

import { useQueryParams } from 'app/shared/hooks/query-params.hook'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'

export const RecipeList = () => {
  const { queryParams, updateQueryParams } = useQueryParams({
    search: String,
    ingredients: String,
    tags: String,
  })

  const router = useRouter() // Initialize router

  const {
    data: recipes = [],
    isLoading,
    error,
    refetch,
  } = useRecipes({
    search: queryParams.search,
    ingredients: queryParams.ingredients,
    tags: queryParams.tags,
  })

  const { data: allRecipes = [], isLoading: isAllRecipesLoading } = useGetAllRecipes()

  if (isLoading || isAllRecipesLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching recipes</div>

  const onSearch = (value: string) => {
    updateQueryParams({ ...queryParams, search: value })
  }

  const clearFilters = () => {
    updateQueryParams({ search: '', ingredients: '', tags: '' })
  }

  const allIngredients = uniq(allRecipes.flatMap((recipe) => recipe.ingredients))
  const allTags = uniq(allRecipes.flatMap((recipe) => recipe.tags))

  return (
    <div className="space-y-4">
      <Input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by recipe name..."
        value={queryParams.search}
      />
      <Select
        onValueChange={(value) => updateQueryParams({ ...queryParams, ingredients: value })}
        value={queryParams.ingredients || ''}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by ingredients" />
        </SelectTrigger>
        <SelectContent>
          {allIngredients.map((ingredient) => (
            <SelectItem
              key={ingredient}
              value={ingredient}
            >
              {ingredient}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => updateQueryParams({ ...queryParams, tags: value })}
        value={queryParams.tags || ''}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by tags" />
        </SelectTrigger>
        <SelectContent>
          {allTags.map((tag) => (
            <SelectItem
              key={tag}
              value={tag}
            >
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex space-x-4">
        <Button onClick={() => refetch()}>Filter</Button>
        <Button
          onClick={clearFilters}
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border p-4 rounded-lg"
          >
            <h2 className="font-bold">{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>{recipe.ingredients.join(', ')}</p>
            <p>{recipe.tags.join(', ')}</p>
            {/* Add a button to navigate to the recipe detail page */}
            <Button onClick={() => router.push(`/recipes/${recipe.id}`)}>View Recipe</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
