import * as express from 'express'

import {RecipeDao} from '../dao/recipe.dao'
import {RecipeModel} from '../../common/interfaces/recipe.model'

export class RecipeService{
    
    private _dao:RecipeDao;
    
    constructor(){
        this._dao = new RecipeDao();
    }
    
    findAll(success: (recipes: RecipeModel[]) => void, failed: (err: any) => void) : void{
        this._dao.getAll(null)
            .then<void>((value: RecipeModel[]) => { success(value) })
            .error<void>((reason: any) => failed(reason))
    }
}