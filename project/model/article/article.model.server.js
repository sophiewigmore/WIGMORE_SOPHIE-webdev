var mongoose = require('mongoose');
var articleSchema = require('./article.schema.server');
var articleModel = mongoose.model("ArticleModel", articleSchema);
var userModel = require("../user/user.model.server");
var db = require("../models.server");


module.exports = articleModel;

