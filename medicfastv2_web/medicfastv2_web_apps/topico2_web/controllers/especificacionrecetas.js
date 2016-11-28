app
// =========================================================================
// Show View and Delete historia 
// =========================================================================
    .controller("EspecificacionrecetaCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.especificacionreceta = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Especificacionreceta.query(params, function(r) {
            $scope.lista = r;
            //$scope.options = r.options;
            $scope.isLoading = false;
        }, function(err) {
            $log.log("Error in list:" + JSON.stringify(err));
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

    $scope.onReorder = function(order) { //TODO
        $log.log('Order: ' + order);
    };

    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            topico2Service.Especificacionreceta.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la Especificacion receta:" + JSON.stringify(d));
                toastr.success('Se eliminó la Especificacion receta ' + d.cantidad, 'especificacionreceta');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update especificacionreceta
// =========================================================================
.controller("EspecificacionrecetaSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.especificacionreceta = {};

    $scope.sel = function() {
        topico2Service.Especificacionreceta.get({ id: $stateParams.id }, function(r) {
            $scope.especificacionreceta = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.especificacionreceta.id) {
            topico2Service.Especificacionreceta.update({ id: $scope.especificacionreceta.id }, $scope.historia, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la especificacion receta ' + r.cantidad, 'especificacionreceta');
                $state.go('topico2.topico2.especificacionrecetas');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Especificacionreceta.save($scope.especificacionreceta, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la especificacion receta ' + r.cantidad, 'especificacionreceta');
                $state.go('topico2.topico2.especificacionrecetas');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.especificacionrecetas');
    };
});
