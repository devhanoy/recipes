import {ProductModel} from './product.model'

export interface IngredientModel{
    product: ProductModel;
    quantity: number; 
}