app
// =========================================================================
// Show View and Delete medicamento 
// =========================================================================
    .controller("MedicamentoCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.medicamento = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Medicamento.query(params, function(r) {
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
            topico2Service.Medicamento.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la medicamento:" + JSON.stringify(d));
                toastr.success('Se eliminó la medicamento ' + d.nombre, 'medicamento');
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
.controller("MedicamentoSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.medicamento = {};

    $scope.sel = function() {
        topico2Service.Medicamento.get({ id: $stateParams.id }, function(r) {
            $scope.medicamento = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
                topico2Service.Medicamento.save($scope.medicamento, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la medicamento ' + r.nombre, 'medicamento');
                $state.go('topico2.topico2.medicamentos');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.medicamentos');
    };
});
