(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService($http) {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);
        }

        function findPageById(webId, pageId) {
            var url = "/api/website/" + webId + "/page/" + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(webId, pageId, page) {
            var url = "/api/website/" + webId + "/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(webId, pageId) {
            var url = "/api/website/" + webId + "/page/" + pageId;
            return $http.delete(url);
        }
    }

})();