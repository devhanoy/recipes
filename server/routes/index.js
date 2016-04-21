var express = require('express');
var router = express.Router();
var path = require('path')

router.use('/stylesheets', express.static(path.join(__dirname,'..', 'public','stylesheets')))
router.use('/templates', express.static(path.join(__dirname,'..', 'views','templates')))
router.use('/node_modules', express.static(path.join(__dirname,'..','..', 'node_modules')))
router.use('/ang', express.static(path.join(__dirname, '..', 'public', 'javascripts', 'ang')))
router.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..','views','index.html'))
});





module.exports = router;
