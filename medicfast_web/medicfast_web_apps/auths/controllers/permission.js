

app

    .controller("PermissionCtrl", function($scope, API, $window, $stateParams, $mdDialog, $log, toastr) {

    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.permission = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        
        //API.Permission.list({ query: $scope.query, page: page }).$promise.then(function(r) {
        API.Permission.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;

            $scope.isLoading = false;

        }, function(err) {
            console.log("Error in list:" + JSON.stringify(err));
            toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
        });
    };
    $scope.list(params);

    $scope.buscar = function() {
        params.page = 1;
        params.fields = $scope.fields;
        params.query = $scope.query;
        $scope.list(params);
    };

    $scope.onReorder = function(order) {

        console.log('Order: ' + order);
    };


    /*
    <md-button class="md-button" aria-label="Mostrar todo" ng-click="listAll()">
                            Mostrar todo
                        </md-button>

    $scope.listAll = function() {
        params.all = true; //así debe quedar
        $scope.list(params);
    };
    */

    //mdDialog
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.new = function(evt) {
        $scope.permission.id = null;
        $scope.permission = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: 'ioteca_web_apps/auths/views/permission/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list(params);

        }, function() {});
    };

    //end mdDialog

    $scope.sel = function(d) {
        $scope.permission = API.Permission.get({ id: d.id });
        $mdDialog.show({
            scope: $scope,
            templateUrl: 'ioteca_web_apps/auths/views/permission/form.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list(params);
            $scope.permission = {};
        }, function() {});
    };

    $scope.save = function() {
        if ($scope.permission.id) {

            API.Permission.update({ id: $scope.permission.id }, $scope.permission).$promise.then(function(r) {
                console.log("r: " + r);
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
        } else {
            API.Permission.save($scope.permission).$promise.then(function(r) {
                console.log("r: " + r);
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };

    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            API.Permission.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                $scope.list(params);
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };


});
