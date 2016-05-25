/**
 * New node file
 */
var mongo = require("./mongo");
//var mongoURL = "mongodb://ec2-52-72-105-67.compute-1.amazonaws.com:27017/login";
var mongoURL = "mongodb://ec2-52-72-105-67.compute-1.amazonaws.com:27017/login";
var mongoURL1="mongodb://ec2-54-164-32-81.compute-1.amazonaws.com:27017/login";
var mongoURL2="mongodb://ec2-54-89-131-188.compute-1.amazonaws.com:27017/login";
exports.login = function(req,res) {

    var json_responses;

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('final');

        coll.findOne({}, function (err, user) {
            if (user) {

                json_responses={"statusCode": 200, "server": mongoURL, "hello": user.hello};
                res.send(json_responses)
            }
            else {
                json_responses={"statusCode": 401, "server": mongoURL};
                res.send(json_responses)
            }
        });
    });
};
exports.login1 = function(req,res) {

    var json_responses;

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL1);
        var coll = mongo.collection('final');

        coll.findOne({}, function (err, user) {
            if (user) {

                json_responses={"statusCode": 200, "server": mongoURL1, "hello": user.hello};
                res.send(json_responses)
            }
            else {
                json_responses={"statusCode": 401, "server": mongoURL1};
                res.send(json_responses)
            }
        });
    });
};
exports.login2 = function(req,res) {

    var json_responses;

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL2);
        var coll = mongo.collection('final');

        coll.findOne({}, function (err, user) {
            if (user) {

                json_responses={"statusCode": 200, "server": mongoURL2, "hello": user.hello};
                res.send(json_responses)
            }
            else {
                json_responses={"statusCode": 401, "server": mongoURL2};
                res.send(json_responses)
            }
        });
    });
};