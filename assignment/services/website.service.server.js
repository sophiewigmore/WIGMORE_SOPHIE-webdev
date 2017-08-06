var app = require("../../express");

var websiteModel = require("../model/website/website.model.server");

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