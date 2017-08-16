var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model("commentModel", commentSchema);
var userModel = require("../user/user.model.server");
var db = require("../models.server");

commentModel.createComment = createComment;
commentModel.findCommentsForNode = findCommentsForNode;
commentModel.deleteComment = deleteComment;
module.exports = commentModel;

function createComment(comment) {
    return commentModel.create(comment);
}

function findCommentsForNode(nodeId) {
    return commentModel.find({_node: nodeId});
}

function deleteComment(commentId) {
    console.log(commentId);
    return commentModel.remove({_id: commentId})
}
