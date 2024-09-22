import { RecipeForm } from "@/app/entities/recipe/ui/recipe-form/recipe-form.component";

export default function NewRecipePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Recipe</h1>
      <RecipeForm />
    </div>
  );
}
