var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect("mongodb://localhost/webdevproject");

require("./model/models.server");
require("./services/article.service.server.js");
require("./services/projectUser.service.server.js");
require("./services/comment.service.server.js");

module.exports = function(app) {

}