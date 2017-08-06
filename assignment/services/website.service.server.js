var app = require("../../express");

var websiteModel = require("../model/website/website.model.server");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/user/:userId/website", findWebsitesbyUser);
app.get("/api/website/:webId", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:webId", updateWebsite);
app.delete("/api/website/:webId", deleteWebsite);

function findWebsitesbyUser(req, response) {
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            response.json(websites);
            return;
        })
}

function createWebsite(req, response) {
    var website = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            response.json(website);
            return;
        })
}

function findWebsiteById(req, response) {
    var webId = req.params.webId;

    websiteModel
        .findWebsiteById(webId)
        .then(function(website) {
            response.send(website);
        }, function(err) {
            response.sendStatus(404).send(err);
        })
}

function updateWebsite(req, response) {
    var webId = req.params.webId;
    var website = req.body;

    websiteModel
        .updateWebsite(webId, website)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function deleteWebsite(req, response) {
    var webId = req.params.webId;

    websiteModel
        .deleteWebsite(webId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}