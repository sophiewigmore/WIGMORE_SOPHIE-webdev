var app = require("../../express");

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
    var pgs = [];
    for (var p in pages) {
        if (pages[p].websiteId === websiteId) {
            pgs.push(pages[p]);
        }
    }
    response.json(pgs);
}

function createPage(req, response) {
    var websiteId = req.params.webId;
    var page = req.body;

    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    response.json(page);
}

function findPageById(req, response) {
    var pageId = req.params.pageId;
    for (var p in pages) {
        if (pages[p]._id === pageId) {
            response.json(pages[p]);
            return;
        }
    }
    response.sendStatus(404);
}

function updatePage(req, response) {
    var pageId = req.params.pageId;
    var page = req.body;
    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages[p] = page;
            response.json(pages[p]);
            return;
        }
    }
    response.sendStatus(404);
}

function deletePage(req, response) {
    var pageId = req.params.pageId;

    for (var p in pages) {
        if (pages[p]._id === pageId) {
            response.json(pages.splice(p, 1));
            return;
        }
    }
    response.sendStatus(404);
}