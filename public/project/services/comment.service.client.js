(function () {
    angular
        .module("WebDevProject")
        .factory("commentService", commentService);

    function commentService($http) {
        var api = {
            "createComment" : createComment,
            "getCommentsForNode" : getCommentsForNode,
            "deleteComment" : deleteComment
        };
        return api;

        function createComment(comment) {
            var url = "/project/api/comment";
            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                })
        }

        function getCommentsForNode(nodeId) {
            var url = "/project/api/comment/" + nodeId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteComment(commentId) {
            var url = "/project/api/comment/" +commentId;
            return $http.delete(url);
        }
    }
})();