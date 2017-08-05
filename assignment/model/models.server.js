var q = require('q');


var connectionString = 'mongodb://localhost/webdev-summer-2-2017'; // for local

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;