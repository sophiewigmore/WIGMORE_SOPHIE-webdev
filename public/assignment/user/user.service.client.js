/**
 * Created by sophiewigmore on 7/19/17.
 */
(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];
       var api = {
            "findUserbyUsernameAndPassword" : findUserbyUsernameAndPassword,
           "findUserById" : findUserById
        };
       return api;

        function findUserbyUsernameAndPassword(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username == username &&
                    _user.password == password) {
                    return _user;
                }
            }
            return null;
        }

        function findUserById(userId) {

            for(var u in users) {
                var _user = users[u];
                if(_user._id == userId) {
                    return _user;
                }
            }
            return null;
        }

    }


})();