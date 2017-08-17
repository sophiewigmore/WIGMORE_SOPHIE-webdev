var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
        content: String,
        _user: {type: mongoose.Schema.Types.Object, ref: 'ProjectUserModel'},
        _nodeId: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "projectComment"}
);

module.exports = commentSchema;
