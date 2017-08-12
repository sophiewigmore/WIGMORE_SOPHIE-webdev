var q = require('q');


var connectionString = 'mongodb://localhost/webdevproject'; // for local

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;