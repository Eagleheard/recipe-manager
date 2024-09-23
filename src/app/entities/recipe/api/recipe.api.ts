import { RecipeModel } from '../model/recipe.model'
import { CreateOneRecipeDto } from './dtos/create-recipe.dto'
import { GetRecipesQueryParams } from './interfaces/get-recipes-query-params.interface'

import axiosInstance from 'app/shared/api/axiosInstanse'

export const fetchRecipes = async (filters?: GetRecipesQueryParams) => {
  const response = await axiosInstance.get<RecipeModel[]>('/recipes', {
    params: filters,
  })

  return response.data
}

export const fetchRecipeById = async (id: string) => {
  const response = await axiosInstance.get<RecipeModel>(`/recipes/${id}`)

  return response.data
}

export const createRecipe = async (data: CreateOneRecipeDto) => {
  const response = await axiosInstance.post<RecipeModel>('/recipes', data)

  return response.data
}

export const updateRecipe = async (id: string, data: CreateOneRecipeDto) => {
  const response = await axiosInstance.put<RecipeModel>(`/recipes/${id}`, data)

  return response.data
}

export const deleteRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/recipes/${id}`)

    return data
  } catch (error) {
    console.log(error)
  }
}
