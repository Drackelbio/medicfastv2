app

    .factory("authsService", function($resource, configAuths) {
    var url = configAuths.authsUrl;
    return {
        Log: $resource(url + "logs/:param/", { 'param': '@param' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }

        }),

        Categoria: $resource(url + "categorias/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),

        Historia: $resource(url + "historias/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),
        Consulta: $resource(url + "consultas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),


         Medicamento: $resource(url + "medicamentos/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),

         Tratamiento: $resource(url + "tratamientos/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),

         Diagnostico: $resource(url + "diagnosticos/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),

         EspecificacionReceta: $resource(url + "especificacionrecetas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }

        }),

        Menu: $resource(url + "menus/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            //"list": { method: 'GET', isArray: false, params: { query: '@query', page: '@page', page_size: '@page_size' } }
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results : angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options : {
                        "count": 1,
                        "pages": 1,
                        "page": 1,
                        "range": "all",
                        "previous": null,
                        "page_size": 1,
                        "next": null
                    };
                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    //if (angular.fromJson(r).actions)
                    return angular.fromJson(r).actions.POST;
                }
            }


        }),
        
        Permission: $resource(url + "permissions/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": {
                method: 'GET', isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results : angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options : {
                        "count": 1,
                        "pages": 1,
                        "page": 1,
                        "range": "",
                        "previous": null,
                        "page_size": 0,
                        "next": null
                    };
                    return { results: results, options: options };
                }
            },

        }),
        

    };
});



/*
app

.factory("Categoria",function function_name ($http) {
    var url="http://localhost:8000/productos/categorias/";
    return {
        "list": function () {
            return $http.get(url).then(function (r) {
                return r;
            });
        },
        "create":function (d) {
            return $http.post(url,d).then(function (r) {
                return r;
            });
        },
        "get":"list",
        "update":function (id, d) {
            return $http({
                method:"PUT",
                data: d,
                url:url+d.id+"/",

            }).then(function (r) {
                return r;
            });
        },
        "delete":function (d) {
            return $http.delete(url+d.id+"/").then(function (r) {
                return r;
            });
        },
    };
});

app

.controller("categoriaController", function ($scope, Categoria) {
        $scope.list=[];

        $scope.listar = function  () {

            Categoria.list().then(function (r) {
                $scope.list=r.data;
            }, function (err) {
                console.log("Error: " + err);
            });
        };
        $scope.listar();

        $scope.get = function  (d) {

            $scope.categoria = d;
        };

        $scope.save = function  () {
            if($scope.categoria.id){
                Categoria.update({ id: "" }, $scope.categoria).then(function (r) {
                    console.log("update "+r.data);
                    $scope.listar();
                }, function (err) {
                    console.log("Error: " + err);
                });
            }else{
                Categoria.create($scope.categoria).then(function (r) {
                    console.log(r.data);
                    $scope.listar();
                }, function (err) {
                    console.log("Error: " + err);
                });
            }
        };

        $scope.delete = function  (d) {

            Categoria.delete({ id: d.id }).then(function (r) {
                console.log(r.data);
                $scope.listar();
            }, function (err) {
                console.log("Error: " + err);
            });
        };

<div ng-controller="categoriaController">

codigo: <input type="text" ng-model="categoria.codigo"><br>
nombre: <input type="text" ng-model="categoria.nombre"><br>


<button type="submit" ng-click="save()">Save</button>

<table>
<tr ng-repeat="d in list | filter:nombre ">
    <td>
        {{ d.codigo}}
    </td>
    <td>
        {{ d.nombre}}
    </td>
    <td>
        <button ng-click="get(d)">edit</button>
        
    </td>
    <td>
        <button ng-click="delete(d)">x</button>
        
    </td>
</tr>
</table>

<button ng-click="saludo()">Saludar</button>
    </div>


        });
*/