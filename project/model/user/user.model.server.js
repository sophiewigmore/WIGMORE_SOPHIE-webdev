var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var db = require("../models.server");
var userModel = mongoose.model('ProjectUserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.saveArticle = saveArticle;
module.exports = userModel;

function saveArticle(userId, article) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.articles.push(article);
        });
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId})
}

function addWebsite(userId, websiteId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        })
}

function removeWebsite(websiteId) {
    userModel
        .findOne({websites:websiteId})
        .then(function (user) {
                    var websiteToSplice = user.websites.indexOf(websiteId);
                    user.websites.splice(websiteToSplice, 1);
                    return user.save();

            });
}