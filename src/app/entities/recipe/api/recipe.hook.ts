import { useQuery, useQueryClient, useMutation } from 'react-query'

import { CreateOneRecipeDto } from './dtos/create-recipe.dto'
import { GetRecipesQueryParams } from './interfaces/get-recipes-query-params.interface'
import { fetchRecipes, fetchRecipeById, createRecipe, updateRecipe, deleteRecipe } from './recipe.api'

import { QueryKey } from 'app/shared/api/constants/query-key.enum'

export const useRecipes = (filters: GetRecipesQueryParams) => {
  return useQuery([QueryKey.Recipes], async () => await fetchRecipes(filters))
}

export const useGetAllRecipes = () => {
  return useQuery([QueryKey.AllRecipes], async () => await fetchRecipes())
}

export const useGetRecipeById = (id: string) => {
  return useQuery([QueryKey.Recipe, { id }], async () => await fetchRecipeById(id))
}

export const useCreateRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation(createRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.Recipes])
    },
  })
}

export const useUpdateRecipe = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation(async (data: CreateOneRecipeDto) => await updateRecipe(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKey.Recipes)
      queryClient.invalidateQueries([QueryKey.Recipe, id])
    },
  })
}

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient()

  return useMutation(async (id: string) => await deleteRecipe(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.Recipes])
    },
  })
}
