var q = require('q');
var app = require("../../express");
const https = require('https');


app.get("/api/search/:searchKeyword", searchArticle);
app.get("/api/details/:nodeId", articleDetails);

var apiToken = '1kkIUn4AqH29QKa7puglt2Kn61NNt4o9TJSSbZf1l5sgxfX8dsEpmtcQ16XHwQaJpYg1WH';

function searchArticle(req, res) {
    var searchKeyword = req.params.searchKeyword;

    osfSearchQuery(searchKeyword)
        .then(function (response) {
            res.json(response);
        }, function(error) {
            res.sendStatus(404).send(error);
        });
}

function articleDetails(req, res) {
    var nodeId = req.params.nodeId;

    osfDetails(nodeId)
        .then(function (response) {
            res.json(response);
        }, function(error) {
            res.sendStatus(404).send(error);
        });
}



function osfSearchQuery(searchKeyword) {
    var deferred = q.defer();
    https.get({
        hostname: 'api.osf.io',
        path: '/v2/nodes/?filter[title]=' + searchKeyword,
        headers: {
            "Accept": "application/json",
            'Authorization': 'Bearer' + apiToken
        }
    }, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            try {
                // body = JSON.parse(body);
                deferred.resolve(body);
            } catch (e) {
                deferred.reject({error: e});
            }

        });
    });
    return deferred.promise;
}

function osfDetails(nodeId) {
    var deferred = q.defer();
    https.get({
        hostname: 'api.osf.io',
        path: '/v2/nodes/' + nodeId + "/",
        headers: {
            "Accept": "application/json",
            'Authorization': 'Bearer' + apiToken
        }
    }, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            try {
                // body = JSON.parse(body);
                deferred.resolve(body);
            } catch (e) {
                deferred.reject({error: e});
            }

        });
    });
    return deferred.promise;
}
