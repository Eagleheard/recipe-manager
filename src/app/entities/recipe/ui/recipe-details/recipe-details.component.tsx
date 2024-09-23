'use client'

import { Separator } from '@radix-ui/react-dropdown-menu'
import { useParams, useRouter } from 'next/navigation'

import { Resources } from './recipe-details.resources'
import { useGetRecipeById, useDeleteRecipe } from '../../api/recipe.hook'

import { Badge } from 'components/ui/badge'
import { Button } from 'components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'

export const RecipeDetail = () => {
  const { id } = useParams()
  const router = useRouter()
  const { data: recipe, isLoading, error } = useGetRecipeById(id as string)

  const { mutateAsync: deleteRecipe, isLoading: isDeleteLoading } = useDeleteRecipe()

  if (isLoading || isDeleteLoading) return <div>{Resources.loading}</div>
  if (error) return <div>{Resources.errorMessage}</div>

  const handleDelete = async () => {
    await deleteRecipe(id as string)
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="text-3xl font-bold text-center">{recipe?.name}</CardTitle>
            <div className="flex space-x-4">
              <Button
                onClick={() => router.push('/recipes')}
                variant="outline"
              >
                {Resources.backButtonText}
              </Button>
              <Button
                onClick={() => router.push(`/recipes/${id}/edit`)}
                variant="secondary"
              >
                {Resources.editButtonText}
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
              >
                {Resources.deleteButtonText}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{Resources.descriptionLabel}</h2>
            <p>{recipe?.description}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{Resources.ingredientsLabel}</h2>
            <ul className="list-disc pl-5">
              {recipe?.ingredients.map((ingredient: string, index: number) => <li key={index}>{ingredient}</li>)}
            </ul>
          </div>
          <Separator />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{Resources.instructionsLabel}</h2>
            <p>{recipe?.instructions}</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{Resources.tagsLabel}</h2>
            <div className="flex flex-wrap gap-2">
              {recipe?.tags.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
