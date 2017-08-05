(function () {
    angular
        .module("WamApp")
        .controller("flickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController($routeParams, flickrService, widgetService, $location) {
        var model = this;

        model.userId = $routeParams.userId;
        model.webId = $routeParams.webId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {

        }
        init();


        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService
                .updateWidget(model.widgetId, {'_id': model.widgetId, 'widgetType': 'IMAGE', 'pageId': model.pageId,
                    'width': 100, 'size': 0, 'text': '', 'url': url})
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.webId + "/page/" + model.pageId +
                        "/widget/" + model.widgetId);
                });
        }
    }


})();