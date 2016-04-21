import {Injectable} from 'angular2/core'
import {RecipeModel} from '../../common/interfaces/recipe.model'
import {RecipeDetailModel} from '../../common/interfaces/recipe-detail.model'

@Injectable()
export class RecipeService{
    getRecipesList() : RecipeModel[]{
        return [
            {
                name: 'Cassoulet',
                selected: false,
                category: 'Plat principal',
                shortDescription: 'Plat bien lourd du Périgord',
                displayed: false 
            },
            {
                name: 'Mousse au chocolat',
                selected: false,
                category: 'Dessert',
                shortDescription: 'Petit dessert fait maison, 100% chocolat',
                displayed: false 
            },
            {
                name: 'Lasagnes',
                selected: false,
                category: 'Plat principal',
                shortDescription: "Plat d'hiver",
                displayed: false 
            }
        ]
    }
    
    getRecipeDetail(recipe: RecipeModel): RecipeDetailModel{
        return {
            name: 'Lasagnes',
            selected: true,
            category: 'Plat principal',
            shortDescription: 'plop',
            displayed: true,
            longDescription: 'Idéal pour les soirées d\'hiver',
            imgUrl: 'images/lasa.jpg',
            ingredientList: [{
                product:{
                    name: 'sauce tomate',
                    unity: 'ml',
                    category: 'épices',
                },
                quantity: 100
            },
            {
                product:{
                    name: 'fromage',
                    unity: 'g',
                    category: 'accompagnement',
                },
                quantity: 100
            }
            ],
            cookingSteps: ['Mettre du fromage','Mettre au four'],
        };
    }
}