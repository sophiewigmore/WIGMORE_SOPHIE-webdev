var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var db = require("../models.server");
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
module.exports = pageModel;


function createPage(websiteId, page) {
    page._website = websiteId;
    var tempPage = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            tempPage = pageDoc;
            websiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    website.pages.push(pageDoc._id);
                    return website.save();
                })
        })
        .then(function () {
            return tempPage;
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website: websiteId})
}

function findPageById(pageId) {
    return pageModel.findById({_id: pageId});
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId},
        {$set : page})
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}