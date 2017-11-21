
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://justin:password@ds249575.mlab.com:49575/heroku_92knqpjf';
//to process data sent in on request need body-parser module
var bodyParser = require('body-parser');
var path = require('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode

module.exports.storeData = function (req, res, next) {

    mongodb.MongoClient.connect(mongoDBURI, function (err, db) {
        if (err) throw err;
        /**************************************************************************
         * IMPORTANT:  this is how you generate  a random number for  3IDs that
         * you will need for the collections cusomerID, billinID and   shippingID
         *    WHY?  the retrieve _id  info after and  insert (see below)  does not seem
         *     to function properly on Heroku
         *    so to know the ID we simply generate it in code  rather than
         *     autogenerate it for the documents we newly insert into the CUSOTMERS, BILLING, SHIPPING
         *      for ORDERS we allow the system to autogenerate its  _id
         */
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        //customer collection operation
        var CUSTOMERS = db.collection('CUSTOMERS');
        /*CUSTOMERS.deleteMany({}, function (err, result) {
        if (err) throw err;
        });*/
        var customerdata = {
            _id: customerID,
            FIRSTNAME: shipment_info['fname'],
            LASTNAME: shipment_info['lname'],
            STREET: shipment_info['add1'] + ' ' + shipment_info['add2'],
            CITY: shipment_info['city'],
            STATE: shipment_info['state'],
            ZIP: shipment_info['zipcode'],
            PHONE: shipment_info['phone']
        };
        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        })})};