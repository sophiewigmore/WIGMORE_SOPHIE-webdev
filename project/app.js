var app = require("../express");
var https = require('https');

app.get("/api/concept/:concept", searchByConcept);

var apiToken = '1kkIUn4AqH29QKa7puglt2Kn61NNt4o9TJSSbZf1l5sgxfX8dsEpmtcQ16XHwQaJpYg1WH';

function searchByConcept(req, res) {

    var concept = req.params.concept;

    var options = {
        host: 'api.osf.io',
        path: '/v2/nodes?filter[title]=' + concept,
        //This is the only line that is new. `headers` is an object with the headers to request
        headers: {'Authorization': 'Bearer ' + apiToken}
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            res.send(str);
        });
    };

    https.request(options, callback).end();
}
