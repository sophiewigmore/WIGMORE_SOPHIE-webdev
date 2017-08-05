/**
 * Created by sophiewigmore on 7/19/17.
 */
(function () {
    angular
        .module("WebDevProject")
        .factory("genomeService", genomeService);

    function genomeService($http) {
        var api = {
            "searchByConcept" : searchByConcept
        };
        return api;
        var apiToken = '1kkIUn4AqH29QKa7puglt2Kn61NNt4o9TJSSbZf1l5sgxfX8dsEpmtcQ16XHwQaJpYg1WH';

        function searchByConcept(searchConcept) {
            var url = "https://api.osf.io/v2/nodes/?filter[title]=" + searchConcept;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }


})();