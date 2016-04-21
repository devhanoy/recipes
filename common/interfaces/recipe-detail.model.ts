import {RecipeModel} from './recipe.model'
import {IngredientModel} from './ingredient.model'

export interface RecipeDetailModel extends RecipeModel{
    longDescription: string;
    imgUrl: string;
    ingredientList: IngredientModel[];
    cookingSteps: string[];
} 