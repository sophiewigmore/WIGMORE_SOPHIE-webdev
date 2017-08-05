(function () {
    angular
        .module("WamApp")
        .factory("flickrService", flickrService);

    function flickrService($http) {
        var api = {
            "searchPhotos" : searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var key = "0ded58e26a2240c55d09d3245c3fb4b0";
            var secret = "1f22a01286572e1c";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

})();