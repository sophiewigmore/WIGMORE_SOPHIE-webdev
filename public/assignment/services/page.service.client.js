(function () {
    angular
        .module("WamApp")
        .service("pageService", pageService);

    function pageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "890", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        this.findPagesByWebsiteId = findPagesByWebsiteId;
        this.createPage = createPage;
        this.findPageById = findPageById;

        function findPagesByWebsiteId(websiteId) {
            var pgs = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    pgs.push(pages[p]);
                }
            }
            return pgs;
        }

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;
        }
    }

})();