var express = require('express');
var router = express.Router();

var controllerMain = require('../controllers/main')
var controllerMongoCollection = require('../controllers/database')
//to process data sent in on request need body-parser module

var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode
//#########################################

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/getAllOrders', controllerMongoCollection.getAllOrders);
module.exports = router;