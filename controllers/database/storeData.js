
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
        var ordersID = Math.floor((Math.random() * 1000000000000) + 1);
        //customer collection operation
        var CUSTOMERS = db.collection('CUSTOMERS');
        var BILLING = db.collection('BILLING');
        var SHIPPING = db.collection('SHIPPING');
        var ORDERS = db.collection('ORDERS');
        /*CUSTOMERS.deleteMany({}, function (err, result) {
        if (err) throw err;
        });*/
        var customerdata = {
            _id: customerID,
            FIRSTNAME: session_info['firstname'],
            LASTNAME: session_info['lastname'],
            STREET: session_info['address'] + ' ' + session_info['address2'],
            CITY: session_info['city'],
            STATE: session_info['state'],
            ZIP: session_info['zipCode'],
            PHONE: session_info['telephone']
        };
        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        })
        //customer collection operation


        // BILLING
        var billingdata = {
            _id: billingID,
            CREDITCARDDATE: session_card['date'],
            CREDITCARDEXP: session_card['date'],
            CREDITCARDNUM: session_card['number'],
            CREDITCARDSECURITYNUM: "123",
            CREDITCARDTYPE: session_card['type'],
            CUSTOMERID: customerID,
            //////////
        };
        BILLING.insertOne(billingdata, function (err, result) {
            if (err) throw err;
        })
        //SHIPPING DATA
        var shippingData = {
            _id: shippingID,
            SHIPPING_STREET: session_info['address'] + ' ' + session_info['address2'],
            SHIPPING_CITY: session_info['city'],
            SHIPPING_STATE: session_info['state'],
            SHIPPING_ZIP: session_info['zipCode']
        };
        SHIPPING.insertOne(shippingData, function (err, result) {
            if (err) throw err;
        })
        //ORDER DATA
        var orderData = {
            _id: ordersID,
            BILLING_ID: billingID,
            CUSTOMER_ID: customerID,
            SHIPPING_ID: shippingID,
            DATE: session_card['date'],
            ORDER_TOTAL: 1,
            PRODUCT_VECTOR: session_cart
        };
        ORDERS.insertOne(orderData, function (err, result) {
            if (err) throw err;
        })
        response.render('storeData', {title: "Order Successful!"});

        //Terminates the connection after everything is inserted
        db.close(function (err) {
            if(err) throw err;
        });
    })

};