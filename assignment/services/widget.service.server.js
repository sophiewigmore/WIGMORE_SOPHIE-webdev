var app = require("../../express");

var widgetModel = require("../model/widget/widget.model.server");

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/page/:pageId/widget", sort);
app.post("/api/page/:pageId/widget", createWidget);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);


function findWidgetsByPageId(req, response) {
    var pageId = req.params.pageId;

    var wdgts = [];
    for (var w in widgets) {
        if (widgets[w].pageId === pageId) {
            wdgts.push(widgets[w]);
        }
    }
    response.json(wdgts);
}

function findWidgetById(req, response) {
    var widgetId = req.params.widgetId;
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            response.json(widgets[w]);
            return;
        }
    }
    response.sendStatus(404);
}

function sort(req, response) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;

    var widgetToMove = widgets.splice(initial, 1)[0];
    widgets.splice(final, 0, widgetToMove);

    response.json(widgets);
}

function createWidget(req, response) {
    var pageId = req.params.pageId;
    var widget = req.body;

    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    response.json(widget);
}

function updateWidget(req, response) {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            widgets[w] = widget;
            response.json(widgets[w]);
            return;
        }
    }
    response.sendStatus(404);
}

function deleteWidget(req, response) {
    var widgetId = req.params.widgetId;

    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            response.json(widgets.splice(w, 1));
            return;
        }
    }
    response.sendStatus(404);
}


function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.webId;
    var pageId = req.body.pageId;
    for (var w in widgets) {
        if (widgets[w]._id == widgetId) {
            var widget = (widgets[w]);
        }
    }
    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    if (myFile == null) {
        res.redirect(callbackUrl);
        return;
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget.url = '/uploads/'+filename;
    res.redirect(callbackUrl);
}
