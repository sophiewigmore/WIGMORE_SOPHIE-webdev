var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        articles: [String],
        dateCreated: {type: Date, default: Date.now()},
        isAdmin: Boolean
    }, {collection: "projectUser"}
);

module.exports = userSchema;
