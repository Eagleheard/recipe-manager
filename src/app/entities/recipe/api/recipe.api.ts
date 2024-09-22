import axiosInstance from '@/app/shared/api/axiosInstanse';

export const fetchRecipes = async (filters?: any) => {
  const response = await axiosInstance.get<any>('/recipes', { params: filters });
  return response.data;
};

export const fetchRecipeById = async (id: number) => {
  const response = await axiosInstance.get(`/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (data: any) => {
  const response = await axiosInstance.post('/recipes', data);
  return response.data;
};

export const updateRecipe = async (id: number, data: any) => {
  const response = await axiosInstance.put(`/recipes/${id}`, data);
  return response.data;
};

export const deleteRecipe = async (id: number) => {
  const response = await axiosInstance.delete(`/recipes/${id}`);
  return response.data;
};