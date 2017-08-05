var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/webdev-summer-2-2017');

var userSchema = mongoose.Schema({
    username: String,
    first: String,
    last: String,
    status: {type: String, enum: ["MARRIED", "SINGLE"]},
    dob: Date,
    created: {type: Date, default: Date.now}
}, {collection: "user"});


var userModel = mongoose.model("UserModel", userSchema);

updateUser("s9038120938120938", {first: "Alice", last: "Wonder"});

removeUser("12903812903810923")
    .then(function (status) {
        console.log(status);
    });

function removeUser(userId) {
    return UserModel.remove({_id: userId});
}

findUserByUsername("alice")
    .then(function(user) {
        console.log(user);
    });

function updateUser(userId, newUserValues) {
    return userModel.update({_id: userId}, {
        $set: newUserValues
    });
}
function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(id) {
    return userModel.findById(id);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function createUser(user) {
    userModel.create(user, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
    });
}
