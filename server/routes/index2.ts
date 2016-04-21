import * as express from 'express'
import * as path from 'path'

var router = express.Router();

router.use('/stylesheets', express.static(path.join(__dirname,'..', 'public','stylesheets')))
router.use('/templates', express.static(path.join(__dirname,'..', 'views','templates')))
router.use('/libs', express.static(path.join(__dirname,'..','libs')))
router.use('/ang', express.static(path.join(__dirname, '..', 'public', 'javascripts', 'ang')))
router.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')))

/* GET home page. */
router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
  res.sendFile(path.join(__dirname, '..','views','index.html'))
});

module.exports = router;
