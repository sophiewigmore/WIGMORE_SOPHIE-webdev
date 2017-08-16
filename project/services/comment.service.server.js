var app = require("../../express");
var commentModel = require("../model/comment/comment.model.server");


app.post("/project/api/comment", createComment);
//app.get("/project/api/comment/:userId", findCommentForUser);
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