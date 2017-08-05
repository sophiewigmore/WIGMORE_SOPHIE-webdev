(function () {
    angular
        .module("WebDevProject")
        .controller("searchController", searchController);

    function searchController(genomeService) {
        var model = this;

        model.searchByConcept = searchByConcept;

        function init() {

        }

        init();

        function searchByConcept(searchConcept) {
            if (searchConcept) {
                genomeService.searchByConcept(searchConcept)
                    .then(function (results) {
                        console.log(results);
                    });
            } else {
                model.errorMessage="enter a search item";
            }
        }
    }

})();