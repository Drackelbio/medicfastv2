app
// =========================================================================
// Show View and Delete medicamento 
// =========================================================================
    .controller("TratamientoCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.tratamiento = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Tratamiento.query(params, function(r) {
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
            topico2Service.Tratamiento.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó el tratamiento:" + JSON.stringify(d));
                toastr.success('Se eliminó el tratamiento' + d.diagnostico, 'tratamiento');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update medicamento
// =========================================================================
.controller("TratamientoSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.tratamiento = {};

    $scope.sel = function() {
        topico2Service.Tratamiento.get({ id: $stateParams.id }, function(r) {
            $scope.tratamiento = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.tratamiento.id) {
            topico2Service.Tratamiento.update({ id: $scope.tratamiento.id }, $scope.tratamiento, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó el tratamiento' + r.diagnostico, 'tratamiento');
                $state.go('topico2.topico2.tratamientos');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Tratamiento.save($scope.tratamiento, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó el tratamiento ' + r.diagnostico, 'tratamiento');
                $state.go('topico2.topico2.tratamientos');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.tratamientos');
    };
});
