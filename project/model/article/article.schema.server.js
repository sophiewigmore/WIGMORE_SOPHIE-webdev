var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
        title: String,
        category: String,
        dateCreated: {type: Date, default: Date.now()},
    }, {collection: "projectArticle"}
);

module.exports = articleSchema;
