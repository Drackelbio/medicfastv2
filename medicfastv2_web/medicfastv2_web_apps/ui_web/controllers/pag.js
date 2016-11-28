app.factory('uiPaginate', [
function() {
        
    var rangeAlgorithms = {
        all: function(numPages, currentPage) {
            var i,
                pagesInRange = [];
            
            for (i = 1; i <= numPages; i++) {
                pagesInRange.push(i);
            }
            
            return pagesInRange;
        },
        jumping: function(numPages, currentPage, size) {
            var i,
                min = Math.floor(currentPage / size) * size,
                max = Math.min(min + size - 1, numPages - 1),
                pagesInRange = [];
            
            for (i = min + 1; i <= max + 1; i++) {
                pagesInRange.push(i);
            }
            
            return pagesInRange;
        },
        sliding: function(numPages, currentPage, size) {
            var i,
                stepMin = Math.floor((size - 1) / 2),
                stepMax = size - 1 - stepMin,
                min = Math.max(0, currentPage - stepMin ),
                max = Math.min(currentPage + stepMax, numPages - 1),
                pagesInRange = [];
            
            while (min > 0 && max - min < size - 1) {
                min--;
            }
            
            while (max < numPages - 1 && max - min < size - 1) {
                max++;
            }
            
            for (i = min + 1; i <= max + 1; i++) {
                pagesInRange.push(i);
            }
            
            return pagesInRange;
        }
    };
                                            
    return function uiPaginate(items, options) {
        var defaultOptions = {
                itemsPerPage: 9,
                currentPage: 1,
                scrollingStyle: 'all',
                pagesInRangeSize: 4
            },
            paginator = {},
            currentPage; // 0-based
        
        options = angular.extend({}, defaultOptions, options);
        // check itemsPerPage is a number > 0
        // maybe I should throw an exception instead of using a default?
        options.itemsPerPage = angular.equals(+options.itemsPerPage, NaN) ?
            defaultOptions.itemsPerPage :
            Math.max(+options.itemsPerPage, 1);
        options.scrollingStyle = rangeAlgorithms[options.scrollingStyle] ? options.scrollingStyle : defaultOptions.scrollingStyle;
        options.pagesInRangeSize = angular.equals(+options.pagesInRangeSize, NaN) ?
            defaultOptions.pagesInRangeSize :
            Math.max(+options.pagesInRangeSize, 1);
        // TODO: check currentPage option
        
        // TODO: if items is not an array throw exception

        function currentItems() {
            var start = currentPage * options.itemsPerPage;
            
            return items.slice(start, start + options.itemsPerPage);
        }
        
        function calculatePagesInRange() {
            return rangeAlgorithms[options.scrollingStyle](numPages(), currentPage, options.pagesInRangeSize);
        }
      
        function numPages() {
            return Math.ceil(items.length / options.itemsPerPage);
        }
        
        function setPage(page) {
            // accepts a 1-based page, transform it in 0-based
            page--;
            
            //Clamp new page between 0 and numPages()-1
            currentPage = Math.max(0, Math.min(page, numPages() - 1));
    
            var items = currentItems(),
                firstItemNumber = currentPage * options.itemsPerPage + Math.min(items.length, 1),
                lastItemNumber = Math.max(0, firstItemNumber + items.length - 1),
                pagesInRange = calculatePagesInRange(),
                firstPageInRange = pagesInRange[0],
                lastPageInRange = pagesInRange[pagesInRange.length - 1];
            
            angular.extend(paginator, {
                items: items,
                firstItemNumber: firstItemNumber,
                lastItemNumber: lastItemNumber,
                current: currentPage + 1,
                first: currentPage == 0,
                last: currentPage == numPages() - 1,
                pagesInRange: pagesInRange,
                firstPageInRange: firstPageInRange,
                lastPageInRange: lastPageInRange,
                pageCount: numPages()
            });
        }     
        
        function nextPage() {
            setPage(currentPage + 2);
        }
        
        function previousPage() {
            setPage(currentPage);
        }

        setPage(options.currentPage);
        
        return angular.extend(paginator, {
            totalItemCount: items.length,
            itemsPerPage: options.itemsPerPage,
            setPage: setPage,
            prev: previousPage,
            next: nextPage
        });
    };
        
}]);


app

    .controller("PagCtrl", function ($scope, uiPaginate, $filter) {
    var i,
        products;
    
    $scope.sorting = 'Name';
    
    $scope.updateProducts = function() {
        var productsNum = Math.round(Math.random() * 1000);
        
        products = [];
        
        for (i=0; i<productsNum; i++) {
            products.push({
                Name: "Product " + i,
                Thumb: "http://placehold.it/120x100",
                Price: +(Math.random() * 1000).toFixed(2),
                Description: "Very long description of Product " + i,
                Detail: ""
            });
        }
        
        sortProducts();
    };
    
    function sortProducts() {
        products = $filter('orderBy')(products, $scope.sorting);
        paginateProducts();
    }
    
    function paginateProducts() {
        var currentPage = 1;
        
        if ($scope.products) {
            currentPage = $scope.products.current;
        }
        
        $scope.products = uiPaginate(products, {itemsPerPage: 10, currentPage: currentPage, scrollingStyle: 'jumping', pagesInRangeSize: 5});
    }
    
    $scope.$watch('sorting', function() {
        sortProducts();
    });
    
    $scope.updateProducts();
});





