var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var db = require("../models.server");
var userModel = mongoose.model('ProjectUserModel', userSchema);
var articleModel = require("../article/article.model.server");
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.searchUsers = searchUsers;
module.exports = userModel;

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

function searchUsers(username) {
    if(username === 'undefined') {
        console.log(username);
        return userModel.find();
    } else {
        return userModel
            .find({"username": {$regex : ".*" + username + ".*"}})
    }
}