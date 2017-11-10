var express = require('express');
var router = express.Router();
var XXX = express.Router();
XXX.get('/mongodb', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;
        //get collection of routes
        var Routes = db.collection('Routes');
        //get all Routes
        Routes.find({ }).sort({ name: 1 }).toArray(function (err, docs) {
            if(err) throw err;

            response.render('mongodb', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect

});//end XXX.get
//########################################

//to process data sent in on request need body-parser module

var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode
//#########################################

//now processing post
router.post('/readNameAndRespond', function(req, res, next) {

    //expecting data variable called name --retrieve value using body-parser
    var body = JSON.stringify(req.body);  //if wanted entire body as JSON
    var params = JSON.stringify(req.params);//if wanted parameters
    var value_name = req.body.name;  //retrieve the data associated with name
    res.send("hello " + value_name);
});
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = router;