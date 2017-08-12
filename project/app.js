var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect("mongodb://localhost/webdevproject");

require("./model/models.server");
require("./services/article.service.server.js");
require("./services/user.service.server.js");