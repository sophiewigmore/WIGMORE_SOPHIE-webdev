/*
/!**
 * Created by sophiewigmore on 7/19/17.
 *!/
(function () {
    var app = require("../../express");

    app.post("/api/user", createUser);
   // app.get(" /api/user?username=username", findUserByUsername);
    //app.get("/api/user?username=username&password=password", findUserByCredentials);
    //app.get("/api/user/:userId", findUserById);
    //app.put("/api/user/:userId", updateUser);
    //app.delete("/api/user/:userId", deleteUser);


    var users = [
        { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
        { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
        { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
        { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
    ];

    function createUser(req, response) {
        var user = req.body.user;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        response.send(user);
    }

    function findUserByUsername(req, response) {
        var username = req.query.username;
        for (var u in users) {
            var _user = users[u];
            if (_user.username == username) {
                return _user;
            }
        }
        return null;

    }



})();*/
