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
        isAdmin: Boolean,
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'}],
        google: {
            id: String,
            token: String
        },
    }, {collection: "projectUser"}
);

module.exports = userSchema;
