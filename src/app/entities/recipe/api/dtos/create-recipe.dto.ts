export interface CreateOneRecipeDto {
  name: string
  description: string
  ingredients: string[]
  instructions: string
  tags?: string[]
}
