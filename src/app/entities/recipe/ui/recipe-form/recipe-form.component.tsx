'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'

import { Resources } from './recipe-form.resources'
import { recipeSchema } from './validation/recipe-form.validation'
import { CreateOneRecipeDto } from '../../api/dtos/create-recipe.dto'
import { useGetRecipeById, useCreateRecipe, useUpdateRecipe } from '../../api/recipe.hook'

import { Button } from 'components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Textarea } from 'components/ui/textarea'

type RecipeFormData = z.infer<typeof recipeSchema>

export const RecipeForm = () => {
  const { id: recipeId } = useParams()
  const router = useRouter()

  const { data: recipe } = useGetRecipeById(recipeId as string)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipeId
      ? recipe
      : {
          name: '',
          description: '',
          ingredients: [''],
          instructions: '',
          tags: [''],
        },
  })

  const createRecipe = useCreateRecipe()
  const updateRecipe = useUpdateRecipe(recipeId as string)

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    //@ts-expect-error
    name: 'ingredients',
  })

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    //@ts-expect-error
    name: 'tags',
  })

  const onSubmit = (data: CreateOneRecipeDto) => {
    if (recipeId) {
      updateRecipe.mutate(data, {
        onSuccess: () => {
          router.push('/')
        },
      })
    } else {
      createRecipe.mutate(data, {
        onSuccess: () => {
          router.push('/')
        },
      })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{recipeId ? Resources.updateRecipe : Resources.createRecipe}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="name">{Resources.nameLabel}</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder={Resources.namePlaceholder}
              />
              {errors.name ? <p className="text-red-500 text-sm mt-1">{errors.name.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="description">{Resources.descriptionLabel}</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder={Resources.descriptionPlaceholder}
              />
              {errors.description ? <p className="text-red-500 text-sm mt-1">{errors.description.message}</p> : null}
            </div>
            <div>
              <Label htmlFor="instructions">{Resources.instructionsLabel}</Label>
              <Textarea
                id="instructions"
                {...register('instructions')}
                placeholder="Enter detailed instructions"
              />
              {errors.instructions ? <p className="text-red-500 text-sm mt-1">{errors.instructions.message}</p> : null}
            </div>
            <div>
              <Label>{Resources.ingredientsLabel}</Label>
              <div className="space-y-2">
                {ingredientFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      {...register(`ingredients.${index}`)}
                      placeholder={`Ingredient ${index + 1}`}
                    />
                    <Button
                      onClick={() => removeIngredient(index)}
                      size="sm"
                      type="button"
                      variant="destructive"
                    >
                      {Resources.removeButton}
                    </Button>
                  </div>
                ))}
                {errors.ingredients ? <p className="text-red-500 text-sm mt-1">{errors.ingredients.message}</p> : null}

                <Button
                  className="mt-2"
                  onClick={() => appendIngredient('')}
                  type="button"
                >
                  {Resources.addIngredientButton}
                </Button>
              </div>
            </div>
            <div>
              <Label>{Resources.tagsLabel}</Label>
              <div className="space-y-2">
                {tagFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      {...register(`tags.${index}`)}
                      placeholder={`Tag ${index + 1}`}
                    />
                    <Button
                      onClick={() => removeTag(index)}
                      size="sm"
                      type="button"
                      variant="destructive"
                    >
                      {Resources.removeButton}
                    </Button>
                  </div>
                ))}
                {errors.tags ? <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p> : null}

                <Button
                  className="mt-2"
                  onClick={() => appendTag('')}
                  type="button"
                >
                  {Resources.addTagButton}
                </Button>
              </div>
            </div>
            <Button
              className="w-full"
              type="submit"
            >
              {recipeId ? Resources.updateRecipe : Resources.createRecipeButton}
            </Button>
            <Button
              className="w-full"
              onClick={() => router.push('/')}
              type="button"
              variant="outline"
            >
              {Resources.cancelButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
