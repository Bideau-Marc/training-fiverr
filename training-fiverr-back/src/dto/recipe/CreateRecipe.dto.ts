import { CreateIngredientDto } from "../ingredient/CreateIngredient.dto";

export class CreateRecipeDto {
    title: string;
    steps?: string;
    ingredients?: CreateIngredientDto[];
}
