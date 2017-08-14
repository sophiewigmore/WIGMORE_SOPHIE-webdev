var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

//app.post('/project/api/login', passport.authenticate('local'), login);
app.get("/project/api/checkLogin", checkLogin);
app.post('/project/api/logout', logout);
app.post('/project/api/register', register);

app.get("/project/api/users", getAllUsers);
app.get("/project/api/user/:userId", getUserById);
app.get("/project/api/user/", findUserByUsername);
app.post("/project/api/user", createUser);
app.put("/project/api/user/:userId", updateUser);
app.delete("/project/api/user/:userId", deleteUser);
app.get("/project/api/searchUsers", searchUsers);
app.get("/project/api/follow", followUser);
app.get("/project/api/unfollow", unfollowUser);
app.get("/project/api/followingUser", followingUser);


app.post('/project/api/login', function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        if (!user) {
            return res.send(null);
        }
        req.logIn(user, function (err) {
            return res.send(user);
        });
    })(req, res);
});

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}


function login(req, res) {
    var user = req.user;
    res.json(user);
}


function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj = req.body;
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status);
            });
        });
}


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

function findUserByUsername(req, response) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            response.send(user);
        }, function (err) {
            response.sendStatus(404).send(err);
        })

}

function getAllUsers(req, response) {
    response.send(users);
}


function getUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        })

}

function searchUsers(req, response) {
    var username = req.query.username;
        userModel
            .searchUsers(username)
            .then(function (users) {
                response.json(users)
            }, function (err) {
                response.sendStatus(400).send(err);
            });
}

function followUser(req, response) {
    var otherUserId = req.query.otherUserId;
    var userId = req.query.userId;
    userModel
        .followUser(userId, otherUserId)
        .then(function (user) {
            response.send(user);
        },function (err) {
            response.sendStatus(500).send(err);
        });
}

function unfollowUser(req, response) {
    var otherUserId = req.query.otherUserId;
    var userId = req.query.userId;
    userModel
        .unfollowUser(userId, otherUserId)
        .then(function (user) {
            response.send(user);
        },function (err) {
            response.sendStatus(500).send(err);
        });
}

function followingUser(req, response) {
    var userId = req.query.userId;
    userModel
        .followingUser(userId)
        .then(function (users) {
            response.json(users);
        }, function (err) {
            response.sendStatus(400).send(err);
        })
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}


