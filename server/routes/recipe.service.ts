import * as express from 'express'
import * as path from 'path'

import {RecipeService} from '../services/recipe.service'
import {RecipeModel} from '../../common/interfaces/recipe.model'

var router = express.Router();
var service = new RecipeService();

router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.sendFile(path.join(__dirname, '..','views','index.html'))
});

router.get('/services/recipes/all', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  service.findAll((recipes: RecipeModel[]) => { res.json(JSON.stringify(recipes)) },
                   (err:any) => { res.json(JSON.stringify(err)) } )
});

export = router