
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

        //grabbing all the post data
        var body = JSON.stringify(req.body);  //if wanted entire body as JSON
        var params = JSON.stringify(req.params);//if wanted parameters
        var value_firstname = req.body.firstname;
        var value_lastname = req.body.lastname;
        var value_street = req.body.street;
        var value_city = req.body.city;
        var value_state = req.body.state;
        var value_zip = req.body.zip;
        var value_phone = req.body.phone;
        var value_creditcarddate = req.body.creditcarddate;
        var value_creditcardexp = req.body.creditcardexp;
        var value_creditcardsecuritynum = req.body.creditcardsecuritynum;
        var value_creditcardnum = req.body.creditcardnum;
        var value_creditcardtype = req.body.creditcardtype;
        var value_shippingstreet = req.body.shipping_street;
        var value_shippingcity = req.body.shipping_city;
        var value_shippingstate = req.body.shipping_state;
        var value_shippingzip = req.body.shipping_zip;
        var value_orderDate = req.body.orderDate;

        var customerdata = {
            _id: customerID,
            FIRSTNAME: value_firstname,
            LASTNAME: value_lastname,
            STREET: value_street,
            CITY: value_city,
            STATE: value_state,
            ZIP: value_zip,
            PHONE: value_phone
        };
        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        })
        //customer collection operation


        // BILLING
        var billingdata = {
            _id: billingID,
            CREDITCARDDATE: value_creditcarddate,
            CREDITCARDEXP: value_creditcardexp,
            CREDITCARDNUM: value_creditcardnum,
            CREDITCARDSECURITYNUM: value_creditcardsecuritynum,
            CREDITCARDTYPE: value_creditcardtype,
            CUSTOMERID: customerID,
            //////////
        };
        BILLING.insertOne(billingdata, function (err, result) {
            if (err) throw err;
        })
        //SHIPPING DATA
        var shippingData = {
            _id: shippingID,
            SHIPPING_STREET: value_shippingstreet,
            SHIPPING_CITY: value_shippingcity,
            SHIPPING_STATE: value_shippingstate,
            SHIPPING_ZIP: value_shippingzip
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
            DATE: value_creditcarddate,
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
module.exports = router;