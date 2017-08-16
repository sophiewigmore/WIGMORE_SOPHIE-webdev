(function () {
    angular
        .module("WebDevProject")
        .factory("commentService", commentService);

    function commentService($http) {
        var api = {
            "createComment" : createComment,
            "getCommentsForNode" : getCommentsForNode
        };
        return api;

        function createComment(comment) {
            var url = "/project/api/comment";
            return $http.post(url, comment);
        }

        function getCommentsForNode(nodeId) {
            var url = "/project/api/comment/" + nodeId;
            return $http.get(url);
        }
    }
})();