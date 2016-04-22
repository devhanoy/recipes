import * as mongoose from 'mongoose'
import * as Promise from 'bluebird'

import {RecipeModel} from '../../common/interfaces/recipe.model'

export class RecipeDao{
    
    private static simpleSchema :mongoose.Schema =
                        new mongoose.Schema({name: 'string',
                                            selected: 'boolean',
                                            category: 'string',
                                            shortDescription: 'string',
                                            displayed: 'boolean'});
    private static simpleModel: mongoose.Model<mongoose.Document> = mongoose.model('Recipes', RecipeDao.simpleSchema);
                                            
    
    getAll(queryConditions: {}): Promise<RecipeModel[]>{
        return new Promise<RecipeModel[]>(function callback(resolve, reject){
            var conn: mongoose.Mongoose = mongoose.connect(process.env.MONGO_SERVER1_URI)
           
            RecipeDao.simpleModel.find(queryConditions, (err: any, res: mongoose.Document)=>{
                conn.disconnect();
                if(err )
                { reject(err) }
                else{
                    var temp: any = res;
                    var recipes: RecipeModel[] = temp as RecipeModel[];
                    resolve(recipes)
                }
            })
        });
    }
    
    saveAll(recipes: RecipeModel[]) : Promise<RecipeModel[]>{
         return new Promise<RecipeModel[]>(function callback(resolve, reject){
             
             if(!recipes.length){
                 return reject(new Error('No documents to insert'))
             }
             
             var conn: mongoose.Mongoose = mongoose.connect(process.env.MONGO_SERVER1_URI)        
           
            RecipeDao.simpleModel.populate(recipes, (err: any,{}, res: mongoose.Document)=>{
                conn.disconnect();
                if(err )
                { reject(err) }
                else{
                    var temp: any = res;
                    var recipes: RecipeModel[] = temp as RecipeModel[];
                    resolve(recipes)
                }
            })
         })
    }
    
    
} 