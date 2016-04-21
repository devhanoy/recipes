import {Component, OnInit} from 'angular2/core'
import {RecipeService} from './services/recipe.service'
import {RecipeModel} from '../common/interfaces/recipe.model'
import {RecipeDetailModel} from '../common/interfaces/recipe-detail.model'

@Component({
    selector : 'my-app',
    templateUrl : 'ang/templates/app.template.html',
    providers : [RecipeService]
})
export class AppComponent implements OnInit{
    name: string = 'mon nom à moi!'
    recipesList: RecipeModel[]
    recipeDetail: RecipeDetailModel;
    
    constructor(private  _recipeService: RecipeService){
        
    }
    
    public ngOnInit(): void{
        this.recipesList = this._recipeService.getRecipesList();
    }
    
    showRecipe(recipe: RecipeModel){
        var currentlyShown: boolean = recipe.displayed;
        this.recipesList.forEach(r => r.displayed = false);
        var currentlyShown: boolean = recipe.displayed;
        recipe.displayed = !currentlyShown;
    }
    
    showRecipeDetail(recipe: RecipeModel): void{
        this.recipeDetail = this._recipeService.getRecipeDetail(recipe);
    }
    
}