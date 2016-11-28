app
// =========================================================================
// Show View and Delete historia 
// =========================================================================
    .controller("HistoriaCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'name,codename';
    var params = {};
    $scope.lista = [];
    $scope.historia = {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        topico2Service.Historia.query(params, function(r) {
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
            topico2Service.Historia.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la historia:" + JSON.stringify(d));
                toastr.success('Se eliminó la historia ' + d.numero, 'historia');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update historia
// =========================================================================
.controller("HistoriaSaveCtrl", function($scope, $state, $stateParams, topico2Service, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.historia = {};

    $scope.sel = function() {
        topico2Service.Historia.get({ id: $stateParams.id }, function(r) {
            $scope.historia = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.historia.id) {
            topico2Service.Historia.update({ id: $scope.historia.id }, $scope.historia, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó la historia ' + r.numero, 'historia');
                $state.go('topico2.topico2.historias');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            topico2Service.Historia.save($scope.historia, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó la historia ' + r.numero, 'historia');
                $state.go('topico2.topico2.historias');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('topico2.topico2.historias');
    };
});
