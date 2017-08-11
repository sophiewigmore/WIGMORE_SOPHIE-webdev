var app = require("../../express");

var widgetModel = require("../model/widget/widget.model.server");

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

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            response.json(widgets);
        })
}

function findWidgetById(req, response) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            response.json(widget);
        })
}

function sort(req, response) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;

    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (page) {
            response.send(page);
        },  function (err) {
            response.sendStatus(400).json(err);
        })

}

function createWidget(req, response) {
    var pageId = req.params.pageId;
    var widget = req.body;

    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            response.json(widget);
        })
}

function updateWidget(req, response) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
     widgetModel
         .updateWidget(widgetId, widget)
         .then(function (status) {
             response.json(status);
         }, function (err) {
             response.sendStatus(404).send(err);
         });
}

function deleteWidget(req, response) {
    var widgetId = req.params.widgetId;
     widgetModel
         .deleteWidget(widgetId)
         .then(function (status) {
             response.json(status);
         }, function (err) {
             response.sendStatus(404).send(err);
         });
}


function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.webId;
    var pageId = req.body.pageId;

    var callbackUrl   = "/assignment/#!/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
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


    var widgetUrl = '/uploads/'+filename;
    widgetModel.setUrl(widgetId, widgetUrl)
        .then(
            function (status) {
                res.redirect(callbackUrl);
            }
        );
}
