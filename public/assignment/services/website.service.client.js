(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService($http) {
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