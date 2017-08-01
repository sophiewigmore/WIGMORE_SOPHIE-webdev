(function () {
    angular
        .module("omdbApp", [])
        .controller("searchController", searchController)
        .config(configuration)
        .service("movieService", movieService)
        .controller("detailsController", detailsController);

    function configuration($routeProvider) {
        $rootProvider
            .when("/", {
                templateUrl: "search.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateUrl: "details.html",
                controller: "detailsController",
                controllerAs: "model"
            })
    }

    function searchController(movieService) {
        var model = this;
        model.searchMovieByTitle = searchMovieByTitle;

        function init() {

        }

        init();

        function searchMovieByTitle(movieTitle, movieService) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }
    }

    function movieService($http) {
        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieByImdbId = searchMovieByImdbId;
        function searchMovieByTitle(movieTitle) {
            var url = "http://8521";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchMovieByImdbId(imdbID) {
            var url = "urlfromapithatrendersimdbinfo";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }

    function detailsController($routeParams, movieService) {
        var model= this;
        model.imdbID = $routeParams.imdbID;

        function init() {
            movieService.searchMovieByImdbID(model.imdbID);
        } init();

    }

})();