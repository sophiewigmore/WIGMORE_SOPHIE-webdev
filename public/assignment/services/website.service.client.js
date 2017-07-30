(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService($http) {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];
        this.findWebsitesbyUser = findWebsitesbyUser;
        this.createWebsite = createWebsite;
        this.findWebsiteById = findWebsiteById;
        this.updateWebsite = updateWebsite;
        this.deleteWebsite = deleteWebsite;

        function findWebsitesbyUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url, website);
        }

        function findWebsiteById(webId) {
            var url = "/api/website/" + webId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWebsite(webId, website) {
            var url = "/api/website/" + webId;
            return $http.put(url, website);
        }

        function deleteWebsite(webId) {
            var url = "/api/website/" + webId;
            return $http.delete(url);
        }
    }
})();