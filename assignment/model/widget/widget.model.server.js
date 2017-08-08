var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var db = require("../models.server");
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.setUrl = setUrl;
module.exports = widgetModel;


function createWidget(pageId, widget) {
    widget._page = pageId;
    var tempWidget = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            tempWidget = widgetDoc;
            pageModel
                .findPageById(pageId)
                .then(function (page) {
                    page.widgets.push(widgetDoc._id);
                    return page.save();
                })
        })
        .then(function () {
            return tempWidget;
        })
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function deleteWidget(widgetId) {
    pageModel.removeWidget(widgetId);
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {
    return widgetModel
        .find({_page: pageId},
            function (err, widgets) {
                var widgetToMove = widgets.splice(start, 1)[0];
                return widgets.splice(end, 0, widgetToMove)
            })
}

function setUrl(widgetId, url) {
    return widgetModel.findOne({_id: widgetId})
        .then(
            function (widget) {
                widget.url = url;
                return widget.save();
            }
        )
}