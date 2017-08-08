(function () {
    angular
        .module("wbdvDirectives", [])
        .directive("sortWidget", sortWidget);

    function sortWidget() {
        var initial;
        var final;

        function linkFunction(scope, element) {
            $(element).sortable({
                axis: 'y',
                start: function (event, ui) {
                    initial = $(ui.item).index();
                },
                stop: function (event, ui) {
                    final = $(ui.item).index();
                    scope.widgetCallback({
                        initial: initial,
                        final: final
                    });
                }
            });
        }

        return {
            scope: {
                widgetCallback: '&'
            },
            link: linkFunction
        }

    }
})();