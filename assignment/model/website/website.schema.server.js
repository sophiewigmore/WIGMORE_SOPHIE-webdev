var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        _id: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        //websites: {type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"},
        dateCreated: {type: Date, default: Date.now()},
        isAdmin: Boolean
    }, {collection: "users"}
);

module.exports = userSchema;
