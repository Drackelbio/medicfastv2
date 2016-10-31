app
    .controller('xCtrl', function($scope) {
        // configurar paginator
        $scope.qryPag = {
            limit: 5,
            offset: 0
        };

        $scope.likeFunction = function(star) {
            alert("I like the book!, and gave " + star + " star.");
        };

    });

/*
Type    Usage
A   <div book></div>
C   <div class="book"></div>
E   <book data="book_data"></book>
M   <!- - directive:book - ->


*/

app
    .directive("likeBook", function() {
        return {
            restrict: 'EA',
            scope: {
                limit: '=mdLimit',
                options: '=mdRowsPage',
                like: '&'
            },
            template: '<input type="text" ng-model="starCount" placeholder="Enter rate count here"/><br/>' +
                '<input type="button" ng-click="like({star: options})" value="Like"/>' +

                '<md-input-container style="margin-top:9px; width:10px " >' +
                '<md-select ng-model="limit"   aria-label="Opciones" >' +
                '<md-option ng-value="rows" ng-repeat="rows in options" aria-label="">' +
                '{{rows}}' +
                '</md-option>' +
                '</md-select>' +
                '</md-input-container>' +

                ''
        };
    });



app
    .directive('app2Pagination', function() {
        return {
            scope: {

                query: '=',
                format: '=',
                display: '=',
                per: '=',
                page: '=',
                pages: '=',
                rango: '=',
                sort: '@',
                term: '@',
                accion: '&'
            },
            link: myLink2,
            template: 'Hola',

        };

        function myLink2(scope, el, attrs) {
            scope.$watchCollection('[per,page,pages, display, rango, format, query]', function() {
                console.log('format=' + scope.format);
                console.log('per=' + scope.per);
            });
        };



    });
