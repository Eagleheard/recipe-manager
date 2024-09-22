// src/components/RecipeForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCreateRecipe, useUpdateRecipe } from '../../api/recipe.hook';
import { Input } from '@/components/ui/input';

const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(5, "Description must be at least 5 characters long"),
  ingredients: z.array(z.string().min(1, "Each ingredient is required")).nonempty("Must add at least one ingredient"),
  instructions: z.string().min(10, "Instructions must be at least 10 characters long"),
  tags: z.array(z.string()).optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export const RecipeForm = ({ recipeId }: { recipeId?: number }) => {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: recipeId ? { /* Fetch data for editing */ } : { name: '', description: '', ingredients: [''], instructions: '', tags: [] },
  });

  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe(recipeId!);

  const onSubmit = (data: RecipeFormData) => {
    if (recipeId) {
      updateRecipe.mutate(data, {
        onSuccess: () => {
          router.push('/recipes');
        },
      });
    } else {
      createRecipe.mutate(data, {
        onSuccess: () => {
          router.push('/recipes');
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register('name')} placeholder="Recipe Name" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Textarea {...register('description')} placeholder="Recipe Description" />
      {errors.description && <p className="text-red-500">{errors.description.message}</p>}

      <Textarea {...register('instructions')} placeholder="Instructions" />
      {errors.instructions && <p className="text-red-500">{errors.instructions.message}</p>}

      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Input key={index} {...register(`ingredients.${index}`)} placeholder={`Ingredient ${index + 1}`} />
        ))}
        {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}
      </div>

      <Button type="submit">Save Recipe</Button>
    </form>
  );
};
