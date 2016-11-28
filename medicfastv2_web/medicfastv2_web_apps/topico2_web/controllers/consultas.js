app
// =========================================================================
// Show View and Delete consulta 
// =========================================================================
    .controller("ConsultaCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.consulta = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Consulta.query(params, function(r) {
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
            topico2Service.Consulta.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la consulta:" + JSON.stringify(d));
                toastr.success('Se eliminó la consulta ' + d.enfermedadactual, 'consulta');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update consulta
// =========================================================================
.controller("ConsultaSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.consulta = {};

    $scope.sel = function() {
        topico2Service.Consulta.get({ id: $stateParams.id }, function(r) {
            $scope.consulta = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.consulta.id) {
            topico2Service.Consulta.update({ id: $scope.consulta.id }, $scope.consulta, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la consulta ' + r.enfermedadactual, 'consulta');
                $state.go('topico2.topico2.consultas');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Consulta.save($scope.consulta, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la consulta ' + r.enfermedadactual, 'consulta');
                $state.go('topico2.topico2.consultas');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.consultas');
    };
});
