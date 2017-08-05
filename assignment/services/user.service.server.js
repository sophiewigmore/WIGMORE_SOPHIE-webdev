var app = require("../../express");

var userModel = require("../model/user/user.model.server");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", isAdmin: true},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);


function deleteUser(req, response) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}

function updateUser(req, response) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        });
}



function createUser(req, response) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            response.json(user);
            return;
        })
}

function findUser(req, response) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                response.send(user);
            }, function(err) {
                response.sendStatus(404).send(err);
            })
    } else {
        userModel
            .findUserByUsername(username)
            .then(function(user) {
                response.send(user);
            }, function(err) {
                response.sendStatus(404).send(err);
            })
    }

}

function getAllUsers(req, response) {
    response.send(users);
}


function getUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        .then(function(user) {
            response.json(user);
        })

}

