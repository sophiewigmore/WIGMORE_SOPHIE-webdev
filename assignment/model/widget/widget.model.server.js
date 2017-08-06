var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var db = require("../models.server");
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createwidget = createwidget;

module.exports = widgetModel;


function createwidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget)
}
