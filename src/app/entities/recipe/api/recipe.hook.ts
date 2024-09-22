import { QueryKey } from "@/app/shared/api/constants/query-key.enum";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetchRecipes, fetchRecipeById, createRecipe, updateRecipe, deleteRecipe } from "./recipe.api";


export const useRecipes = (filters: any) => {
    return useQuery([QueryKey.Recipes], async () => await fetchRecipes(filters));
  };

  export const useGetAllRecipes = () => {
    return useQuery([QueryKey.AllRecipes], async () => await fetchRecipes());
  };
  
  export const useRecipe = (id: number) => {
    return useQuery([QueryKey.Recipe, {id}], () => fetchRecipeById(id));
  };
  
  export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation(createRecipe, {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipes']);
      },
    });
  };
  
  export const useUpdateRecipe = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => updateRecipe(id, data), {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipes']);
        queryClient.invalidateQueries(['recipe', id]);
      },
    });
  };
  
  export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteRecipe, {
      onSuccess: () => {
        queryClient.invalidateQueries(['recipes']);
      },
    });
  };
  