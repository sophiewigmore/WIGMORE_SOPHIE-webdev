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
userModel.getAllUsers = getAllUsers;
userModel.deleteUser = deleteUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;
userModel.searchUsers = searchUsers;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.followingUser = followingUser;
userModel.findUserByGoogleId = findUserByGoogleId;
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

function getAllUsers() {
    return userModel.find();
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
        .findOne({websites: websiteId})
        .then(function (user) {
            var websiteToSplice = user.websites.indexOf(websiteId);
            user.websites.splice(websiteToSplice, 1);
            return user.save();

        });
}

function searchUsers(username) {
    if (username === 'undefined') {
        return userModel.find();
    } else {
        return userModel
            .find({"username": {$regex: ".*" + username + ".*"}})
    }
}

function followUser(userId, otherUserId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.following.push(otherUserId);
            return user.save();
        })
}

function unfollowUser(userId, otherUserId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            var userToSplice = user.following.indexOf(otherUserId);
            user.following.splice(userToSplice, 1);
            return user.save();
        })
}

function followingUser(userId) {
    return userModel
        .find({"following": userId})
        .then(function (users) {
            return users;
        })
}

function findUserByGoogleId(profileId) {
    return userModel
        .findOne({"google.id": profileId});
}