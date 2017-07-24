(function () {
    angular
        .module("WamApp")
        .service("websiteService", websiteService);

    function websiteService() {
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
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function createWebsite(userId, website) {
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsiteById(webId) {
            for (var w in websites) {
                var _website = websites[w];
                if (_website._id == webId) {
                    return _website;
                }
            }
            return null;
        }

        function updateWebsite(webId, website) {
            for (var w in websites) {
                if (websites[w]._id == webId) {
                    websites[w] = website;
                    return websites[w];
                }
            }
            return null;
        }

        function deleteWebsite(webId) {
            for (var w in websites) {
                if (websites[w]._id === webId) {
                    websites.splice(w, 1);
                    return;
                }
            }
            return null;
        }

    }
})();