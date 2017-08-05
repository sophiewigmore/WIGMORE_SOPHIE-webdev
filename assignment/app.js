var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect("mongodb://localhost/webdev-summer-2-2017");

require("./model/models.server");
require("./services/user.service.server.js");
require("./services/website.service.server.js");
require("./services/page.service.server.js");
require("./services/widget.service.server.js");