app

    .controller("NomCtrl", function($scope) {
    
    $scope.save = function() {
        console.log("Hola " + $scope.nombre);
    };
    $scope.lista = [

        {
            "id": 1,
            "nombre": "Yuri Mamani Ramos",
            "codigo": "201322760",
            "triaje": "talla: 1.58, peso: 60, P.A: 32, temperatura: 12°",
            "UlDiagnostico": "gripe/tos seca",
            "estado": true
        }, {
            "id": 2,
            "nombre": "Eleuterio quispe poma",
            "codigo": "201322745",
            "triaje": "talla:1.60, peso: 65, P.A: 32, temperatura: 12°",
            "UlDiagnostico": "fiebre",
            "estado": false
        }, {
            "id": 3,
            "nombre": "Elbio labra chino",
            "codigo": "201322749",
            "triaje": "talla:1.80, peso: 65, P.A: 32, temperatura: 12°",
            "UlDiagnostico": "apertura",
            "estado": true
        }
    ];
});


