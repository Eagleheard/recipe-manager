import { z } from 'zod'

export const recipeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(5, 'Description must be at least 5 characters long'),
  ingredients: z.array(z.string().min(1, 'Each ingredient is required')).nonempty('Must add at least one ingredient'),
  instructions: z.string().min(10, 'Instructions must be at least 10 characters long'),
  tags: z.array(z.string()).optional(),
})
