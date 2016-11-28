

app

    .controller("LogCtrl", function($scope, authsService, $window, $stateParams, $mdDialog, $log, $filter, toastr) {

    //Valores iniciales
    $scope.query=new Date();
    console.log($scope.query);
    var fec=$filter('date')(new Date($scope.query), 'yyyy-MM-dd');

    var params = {
        param: fec
    };
    $scope.lista = [];
    $scope.log = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        
        authsService.Log.list(params).$promise.then(function(r) {
            $scope.lista = r;
            $scope.isLoading = false;

        }, function(err) {
            console.log("Error in list:" + JSON.stringify(err));
            toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
        });
    };
    $scope.list(params);

    $scope.buscar = function() {
        params.param = $filter('date')(new Date($scope.query), 'yyyy-MM-dd');
        $scope.list(params);
    };



});
