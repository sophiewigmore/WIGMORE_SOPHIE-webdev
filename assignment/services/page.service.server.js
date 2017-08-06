var app = require("../../express");

var pageModel = require("../model/page/page.model.server");

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.get("/api/website/:webId/page", findPagesByWebsiteId);
app.post("/api/website/:webId/page", createPage);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function findPagesByWebsiteId(req, response) {
    var websiteId = req.params.webId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            response.json(pages);
            return;
        }, function(err) {
            response.sendStatus(404).send(err);
            return;
        })
}

function createPage(req, response) {
    var websiteId = req.params.webId;
    var page = req.body;

    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            response.json(page);
            return;
        })
}

function findPageById(req, response) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            response.json(page);
            return;
        },function(err) {
            response.sendStatus(404).send(err);
        })
}

function updatePage(req, response) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deletePage(req, response) {
    var pageId = req.params.pageId;

    pageModel
        .deletePage(pageId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}