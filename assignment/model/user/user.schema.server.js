var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        isAdmin: Boolean
    }, {collection: "users"}
);

module.exports = userSchema;
