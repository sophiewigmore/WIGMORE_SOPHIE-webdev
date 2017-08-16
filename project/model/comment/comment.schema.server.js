var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
        content: String,
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUserModel'},
        _node: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "projectComment"}
);

module.exports = commentSchema;
