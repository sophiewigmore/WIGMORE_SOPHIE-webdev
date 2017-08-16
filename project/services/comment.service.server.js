var app = require("../../express");
var commentModel = require("../model/comment/comment.model.server");


app.post("/project/api/comment", createComment);
app.delete("/project/api/comment/:commentId", deleteComment);
app.get("/project/api/comment/:nodeId", findCommentsForNode);

function createComment(req, response) {
    var comment = req.body;
    commentModel
        .createComment(comment)
        .then(function (comment) {
            response.json(comment);
            return;
        }, function (err) {
            response.status(404).send(err);
            return;
        });
}

function deleteComment(req, response) {
    var commentId = req.params.commentId;
    commentModel
        .deleteComment(commentId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function findCommentsForNode(req, response) {
    var nodeId = req.params.nodeId;
    commentModel
        .findCommentsForNode(nodeId)
        .then(function (comments) {
            response.json(comments);
            return;
        }, function (err) {
            response.status(404).send(err);
            return;
        });
}