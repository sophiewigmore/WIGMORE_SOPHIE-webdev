var app = require("../../express");

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
app.get("/api/user/:userId/website/:webId", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/user/:userId/website/:webId", updateWebsite);
app.delete("/api/user/:userId/website/:webId", deleteWebsite);

function findWebsitesbyUser(req, response) {
    var userId = req.params.userId;
    var sites = [];
    for(var w in websites) {
        if(websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    response.json(sites);
}

function createWebsite(req, response) {
    var website = req.body;
    var userId = req.params.userId;

    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    response.json(website);
}

function findWebsiteById(req, response) {
    var webId = req.params.webId;

    for (var w in websites) {
        var _website = websites[w];
        if (_website._id == webId) {
            response.json(_website);
            return;
        }
    }
    response.sendStatus(404);
}

function updateWebsite(req, response) {
    var webId = req.params.webId;
    var website = req.body;

    for (var w in websites) {
        if (websites[w]._id == webId) {
            websites[w] = website;
            response.json(websites[w]);
            return;
        }
    }
    response.sendStatus(404);
}

function deleteWebsite(req, response) {
    var webId = req.params.webId;
    for (var w in websites) {
        if (websites[w]._id === webId) {
            response.send(websites.splice(w, 1));
            return;
        }
    }
    response.sendStatus(404);
}