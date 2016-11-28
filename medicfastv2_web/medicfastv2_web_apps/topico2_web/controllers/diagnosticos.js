app
// =========================================================================
// Show View and Delete Diagnostico 
// =========================================================================
    .controller("DiagnosticoCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.diagnostico = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Diagnostico.query(params, function(r) {
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
            topico2Service.Diagnostico.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la diagnostico:" + JSON.stringify(d));
                toastr.success('Se eliminó la diagnostico ' + d.nombre, 'diagnostico');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update diagnostico
// =========================================================================
.controller("DiagnosticoSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.diagnostico = {};

    $scope.sel = function() {
        topico2Service.Diagnostico.get({ id: $stateParams.id }, function(r) {
            $scope.diagnostico = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.diagnostico.id) {
            topico2Service.Diagnostico.update({ id: $scope.diagnostico.id }, $scope.diagnostico, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la diagnostico ' + r.nombre, 'diagnostico');
                $state.go('topico2.topico2.diagnosticos');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Diagnostico.save($scope.diagnostico, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la diagnostico ' + r.nombre, 'diagnostico');
                $state.go('topico2.topico2.diagnosticos');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.diagnosticos');
    };
});
