/**
 * Util functions for AngularJS
 * @version v0.0.1 (15.02.2016)
 * asullom (c) 2016 Devhres Team
 * License: MIT
 */

var ngDevhres = angular.module("ngDevhres", []);

/**
 * Declaración de variables
 */
ngDevhres.value("safeValue", "Hi ngDevhres team");



/**
 * Servicio security
 */
ngDevhres
    .service("security", function(safeValue) {
        /**
         * Ejemplo simple
         *
         * @returns {string}
         */
        this.doIt = function() {
            return "Security.doIt() called: " + safeValue;
        };

        /**
         * Verifica si un arrays está contenido en otro (usado para verificar roles)
         *
         * @param userRoles {array}
         * @param rolesToCheck {Array}
         * @returns {boolean}
         */
        this.checkRole = function(userRoles, rolesToCheck) {
            if (rolesToCheck.length === 0) {
                return true;
            }
            if (userRoles === null) {
                return false;
            }
            if (userRoles !== null)
                if (userRoles.length === 0) {
                    return false;
                }
            for (var i = 0; i < userRoles.length; i++) {
                if (rolesToCheck.indexOf(userRoles[i]) > -1) {
                    return true;
                }
            }
            return false;
        };

    });


/**
 *  Menu
 */
ngDevhres

    .directive('uiNav', ['$timeout', function($timeout) {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {
            el.find('a').bind('click', function(e) {
                var li = angular.element(this).parent();
                var active = li.parent()[0].querySelectorAll('.active');
                li.toggleClass('active');
                angular.element(active).removeClass('active');
                //angular.element(active).removeClass('toggled');
            });
        }
    };
}])

// =========================================================================
// SUBMENU TOGGLE
// =========================================================================
.directive('toggleSubmenu', function($timeout) {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            /*element.click(function(){
                element.parent().toggleClass('toggled');
                element.parent().find('ul').stop(true, false).slideToggle(200);
            })*/

            element.bind("click", function(e) {

                element.parent().toggleClass('toggled');
                //element.parent().find('ul').stop(true, false).slideToggle(200);
                //var ul = element.find('ul');

                var li = angular.element(this).parent();
                //var active = li.parent()[0].querySelectorAll('.active');
                li.toggleClass('active');
                //angular.element(active).removeClass('active');
                // angular.element(this).children().toggleClass("md-toggle-icon toggled");
            });
            /*
            element.find('a').bind('click', function(e) {
                console.log("click");
              element.parent().toggleClass('toggled');
                element.parent().find('ul').stop(true, false).slideToggle(200);
            });
            */
        }
    };
});

ngDevhres.service("msg", function(safeValue, toastr) {

    return {
        yesDelete: function() {
            toastr.success('Acción ejecutada correctamente', 'Eliminación exitosa!!');
        },
        yesUpdate: function() {
            toastr.success('Acción ejecutada correctamente', 'Actualización exitosa!!');
        },
        yesInsert: function() {
            toastr.success('Acción ejecutada correctamente', 'Se registró correctamente!!');
        },
        yesList: function() {
            toastr.success('Acción ejecutada correctamente', 'Listado con exito!!');
        },
        noDelete: function() {
            toastr.error('La acción eliminar no fue ejecutada.', 'Importante!!');
        },
        noDelete: function(msg) {
            toastr.error(msg, 'Importante!!');
        },
        noUpdate: function() {
            toastr.error('La acción actualizar no fue ejecutada.', 'Importante!!');
        },
        noUpdate: function(msg) {
            toastr.error(msg, 'Importante!!');
        },
        noInsert: function() {
            toastr.error('La acción agregar no fue ejecutada.', 'Importante!!');
        },
        noInsert: function(msg) {
            toastr.error(msg, 'Importante!!');
        },
        noList: function() {
            toastr.error('La acción listar no fue ejecutada.', 'Importante!!');
        },
        noList: function(msg) {
            toastr.error(msg, 'Importante!!');
        },


    };
});


ngDevhres

    .filter('nospace', function() {
    return function(value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
})

.filter('humanizeDoc', function() {
    return function(doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
            return doc.name.replace(/([A-Z])/g, function($1) {
                return '-' + $1.toLowerCase();
            });
        }
        return doc.label || doc.name;
    };
})

.filter('directiveBrackets', function() {
    return function(str) {
        if (str.indexOf('-') > -1) {
            return '<' + str + '>';
        }
        return str;
    };
});



ngDevhres

    .directive('miPagination', function() {
    return {
        restrict: 'EA',
        link: myLink,
        scope: {
            query: '=',
            page: '=',
            pages: '=',
            next: '=',
            previous: '=',
            rango: '=',
            accion: '&',
            activado: '@'
        },
        templateUrl: 'directives/pagination/mi_pagination.html',
        //template: '<ul>' +
        //    '<li ng-repeat="ecq in Pagination" ng-class="ecq.myclase" ng-click="ecq.action()">' +
        //    '<span ng-bind="ecq.value"></span>' +
        //    '</li>' +
        //    '</ul>' +
        //    '',
    };

    function myLink(scope, el, attrs) {
        scope.$watchCollection('[page,pages,next,previous,rango,activado, query]', function() {
            Algoritmo(scope, attrs);
        });
    }

    function parametrosDefault(scope, attrs) {
        scope.Pagination = [];
        scope.puntos = scope.puntos || '...';
        scope.page = parseInt(scope.page);
        scope.pages = parseInt(scope.pages);
        scope.adjacent = parseInt(scope.adjacent) || 2;
        scope.activado = scope.activado || 'active';
    }

    function anteriorSiguente(scope, opcion) {
        var deshabilitar, var1, var2;
        if (opcion === 'anterior') {
            deshabilitar = scope.page - 1 <= 0;
            var1 = {
                value: "<<",
                page: 1
            };
            var2 = {
                value: "<",
                page: scope.previous
            };
        } else {
            deshabilitar = scope.page + 1 > scope.pages;
            var1 = {
                value: ">",
                page: scope.next
            };
            var2 = {
                value: ">>",
                page: scope.pages
            };
        }

        var mybutton = function(myparam, deshabilitar) {
            scope.Pagination.push({
                value: myparam.value,
                action: function() {
                    if (!deshabilitar) {
                        myAccion(scope, myparam.page);
                    }
                }
            });
        };

        mybutton(var1, deshabilitar);
        mybutton(var2, deshabilitar);
    }


    function myAccion(scope, page) {
        if (scope.page == page) {
            return;
        }
        scope.page = page;

        var param = {};
        param.page = scope.page;
        //param.pages = scope.pages;
        param.query = scope.query;

        //scope.accion({ page: scope.page, pages: scope.pages });
        scope.accion({
            params: param
        });
    }

    function rango(inicio, fin, scope) {
        var i = 0;
        for (i = inicio; i <= fin; i++) {
            var item = {
                value: i,
                myclase: (scope.page == i) ? scope.activado : '',
                action: function() {
                    myAccion(scope, this.value);
                }
            };
            scope.Pagination.push(item);
        }
    }

    function agregarPuntos(scope) {
        scope.Pagination.push({
            value: scope.puntos
        });
    }

    function agregarRango(scope) {
        scope.Pagination.push({
            value: scope.rango
        });
    }

    function agregarPrimero(next, scope) {
        rango(1, 2, scope);
        if (next != 3) {
            agregarPuntos(scope);
        }
    }

    function agregarUltimo(prev, scope) {
        if (prev != scope.pages - 2) {
            agregarPuntos(scope);
        }
        rango(scope.pages - 1, scope.pages, scope);
    }


    function Algoritmo(scope, attrs) {
        parametrosDefault(scope, attrs);
        var adj = (scope.adjacent * 2) + 2;
        var inicio, fin;

        //agregarRango(scope);
        anteriorSiguente(scope, 'anterior');
        if (scope.pages <= (adj + 2)) {
            inicio = 1;
            rango(inicio, scope.pages, scope);
        } else {

            if (scope.page - scope.adjacent <= 2) {
                inicio = 1;
                fin = 1 + adj;
                rango(inicio, fin, scope);
                agregarUltimo(fin, scope);

            } else if (scope.page < scope.pages - (scope.adjacent + 2)) {

                inicio = scope.page - scope.adjacent;
                fin = scope.page + scope.adjacent;

                agregarPrimero(inicio, scope);
                rango(inicio, fin, scope);
                agregarUltimo(fin, scope);

            } else {
                inicio = scope.pages - adj;
                fin = scope.pages;
                agregarPrimero(inicio, scope);
                rango(inicio, fin, scope);
            }
        }
        anteriorSiguente(scope, 'siguente');
    }
});



ngDevhres
    .directive('appPagination', function() {
        return {
            scope: {
                fields: '@',
                query: '=',
                format: '@',
                display: '=',
                per: '=',
                page: '=',
                pages: '=',
                rango: '=',
                sort: '@',
                term: '@',
                accion: '&'
            },
            link: myLink2,
            templateUrl: 'directives/pagination/app_pagination2.html',

        };

        function myLink2(scope, el, attrs) {
            scope.$watchCollection('[per,page,pages, display, rango, format, fields, query]', function() {
                console.log('d-per=' + scope.per);
                console.log('d-page=' + scope.page);
                console.log('d-fields=' + scope.fields);
                console.log('d-query=' + scope.query);
                Algoritmo2(scope, attrs);
            });
        }

        function Algoritmo2(scope, attrs) {
            var rangeAlgorithms = {
                all: function(numPages, currentPage) {
                    var i,
                        pagesInRange = [];
                    var cp = {};
                    cp.page = currentPage + 1;
                    for (i = 1; i <= numPages; i++) {
                        var params = {};
                        params.page = i;
                        pagesInRange.push({
                            page: i,
                            params: params,
                            cp: cp
                        });
                    }
                    return pagesInRange;
                },
                jumping: function(numPages, currentPage, size) {
                    var i,
                        min = Math.floor(currentPage / size) * size,
                        max = Math.min(min + size - 1, numPages - 1),
                        pagesInRange = [];
                    var cp = {};
                    cp.page = currentPage + 1;
                    //cp.query = scope.query;
                    for (i = min + 1; i <= max + 1; i++) {
                        var params = {};
                        params.page = i;
                        //params.query = scope.query;
                        //params.page_size = scope.per;
                        pagesInRange.push({
                            page: i,
                            params: params,
                            cp: cp
                        });
                    }
                    return pagesInRange;
                },
                sliding: function(numPages, currentPage, size) {
                    var i,
                        stepMin = Math.floor((size - 1) / 2),
                        stepMax = size - 1 - stepMin,
                        min = Math.max(0, currentPage - stepMin),
                        max = Math.min(currentPage + stepMax, numPages - 1),
                        pagesInRange = [];
                    var cp = {};
                    cp.page = currentPage + 1;
                    while (min > 0 && max - min < size - 1) {
                        min--;
                    }
                    while (max < numPages - 1 && max - min < size - 1) {
                        max++;
                    }
                    for (i = min + 1; i <= max + 1; i++) {
                        var params = {};
                        params.page = i;
                        pagesInRange.push({
                            page: i,
                            params: params,
                            cp: cp
                        });
                    }
                    return pagesInRange;
                }
            };

            function calculatePagesInRange(vl) {
                vl--;
                var currentPage = Math.max(1, Math.min(vl, numPages()));
                return rangeAlgorithms[scope.format](parseInt(numPages()), currentPage, parseInt(scope.display));
            }

            function numPages() {
                // return Math.ceil(scope.count / scope.per);
                return scope.pages;
            }

            var params = {};


            function setVariables(num) {
                if (num == null) {
                    num = scope.page;
                }
                scope.nextParams = {};
                scope.nextParams.page = (parseInt(num) + 1);
                angular.extend(scope.nextParams, params);

                scope.endParams = {};
                scope.endParams.page = scope.pages; //numPages();
                angular.extend(scope.endParams, params);

                scope.prevParams = {};
                scope.prevParams.page = (parseInt(num) - 1);
                angular.extend(scope.prevParams, params);

                scope.startParams = {};
                scope.startParams.page = 1;
                angular.extend(scope.startParams, params);

                //scope.count = parseInt(scope.count);
                //scope.per = parseInt(scope.per);

                scope.pagesInRange = calculatePagesInRange(parseInt(num));

                var firstPageInRange = scope.pagesInRange[0];
                var lastPageInRange = scope.pagesInRange[scope.pagesInRange.length - 1];

                scope.firstPageInRange = calculatePagesInRange(parseInt(firstPageInRange.page) - 1);
                scope.lastPageInRange = calculatePagesInRange(parseInt(lastPageInRange.page) + 1);
                //scope.$state = $state;
                //scope.currentPage = num;
                //scope.pages = scope.pages; //numPages();
                //scope.rango = scope.rango;

                //scope.per=5;
            }

            setVariables();
            scope.listpag = function(params, num) {
                params.fields = scope.fields;
                params.query = scope.query;
                if (scope.per == '0') {
                    params.all = true;
                }
                params.page_size = scope.per;

                scope.accion({
                    params: params
                });
                setVariables(num);
            };


        }

    });

ngDevhres
    .run(["$templateCache", function($templateCache) {
        $templateCache.put("directives/pagination/app_pagination.html", '' +


            '<section layout="row" layout-sm="column" layout-align="center center" layout-wrap class="paginacion">' +
            '    <md-button class="md-raised  md-mini" aria-label="Settings" ng-disabled="prevParams.page == 0"' +
            '               data-ng-click="listpag(startParams,startParams.page)">' +
            '        <ng-md-icon icon="skip_previous" size="24"></ng-md-icon>' +
            '    </md-button>' +
            '    <md-button class="md-raised  md-mini" aria-label="Settings" ng-disabled="prevParams.page == 0"' +
            '               data-ng-click="listpag(prevParams,prevParams.page)">' +
            '        <ng-md-icon icon="fast_rewind" size="24"></ng-md-icon>' +
            '    </md-button>' +






            '    <md-button class=" md-raised  md-mini" aria-label="Settings" ng-show="pagesInRange[0].page != 1"' +
            '               data-ng-click="listpag(firstPageInRange[0].cp,firstPageInRange[0].cp.page)">' +
            '        ...' +
            '    </md-button>' +
            '    <div ng-repeat="p in pagesInRange">' +
            '        <md-button class="md-raised  md-mini" ng-class="{\'md-primary\': p.page == page}"' +
            '                   data-ng-click="listpag(p.params,p.page)">' +
            '            {{p.page}}' +
            '        </md-button>' +
            '    </div>' +
            '    <md-button class="md-raised  md-mini" aria-label="Settings"' +
            '               ng-show="pagesInRange[pagesInRange.length-1].page != pages"' +
            '               data-ng-click="listpag(lastPageInRange[0].cp,lastPageInRange[0].cp.page)">' +
            '        ...' +
            '    </md-button>' +



            '    <md-button class="md-raised  md-mini" aria-label="Settings"' +
            '               data-ng-click="listpag(nextParams,nextParams.page)"' +
            '               ng-disabled="nextParams.page > pages">' +
            '        <ng-md-icon icon="fast_forward" size="24"></ng-md-icon>' +
            '    </md-button>' +
            '    <md-button class="md-raised  md-mini" aria-label="Settings"' +
            '               data-ng-click="listpag(endParams,endParams.page)"' +
            '               ng-disabled="nextParams.page > pages">' +
            '        <ng-md-icon icon="skip_next" size="24"></ng-md-icon>' +
            '    </md-button>' +
            '<span ng-bind="rango"></span> ' +


            '<md-select ng-model="per" ng-change="listpag(startParams,startParams.page)">' +
            '       <md-option value="2">2</md-option>' +
            '      <md-option value="5">5</md-option>' +
            '      <md-option value="20">20</md-option>' +
            '    </md-select>' +

            '</section>' +

            '');

    }]);


ngDevhres.directive("tableResponsive", function($compile, $filter) {
    return {
        restrict: "A",
        compile: function(element, attrs) {
            attrs.$addClass("table-responsive");
            var header_text = [];
            var header_order = [];
            var headers = element[0].querySelectorAll("table thead tr:first-child  > th");
            //console.log("headers.length:" + headers.length);
            if (headers.length) {
                var k = 0;
                for (var i = 0; i < headers.length; i++) {
                    var current = headers[i];
                    var data_order = current.getAttribute("data-order");
                    if (data_order){
                        console.log('data_order:'+data_order);
                        var x=1;
                        angular.element(current).append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" aria-label="title" ng-click="elemAsc()"> <path style="fill: black" d="M11 7h-6l3-4z"/> <path style="fill: black" d="M5 9h6l-3 4z"/> </svg>');
                    }


                    var colspan = null;
                    if (current)
                        colspan = current.getAttribute("colspan");
                    var re = colspan ? parseInt(colspan) : 1;
                    if (re > 1)
                        for (var r = 1; r <= re; r++) {
                            k++;
                            var corresponding_th = element[0].querySelector('thead tr:not(:first-child) th:nth-of-type(' + (k) + ')');
                            if (corresponding_th) {
                                header_text.push(current.textContent + " " + corresponding_th.textContent + ":");
                                data_order = corresponding_th.getAttribute("data-order");

                                if (data_order){
                                    console.log('data_order s:'+data_order);
                                    var x=1;
                                    angular.element(corresponding_th).append('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" aria-label="title" ng-click="elemAsc()"> <path style="fill: black" d="M11 7h-6l3-4z"/> <path style="fill: black" d="M5 9h6l-3 4z"/> </svg>');
                                }

                            } else {
                                header_text.push(current.textContent + ":");
                                console.warn("use thead ");
                            }
                        }
                    else {
                        header_text.push(current.textContent.replace(/\r?\n|\r/, "") + ":");
                    }
                }
                var rows = element[0].querySelectorAll("tbody > tr");
                Array.prototype.forEach.call(rows, function(row) {
                    Array.prototype.forEach.call(row.querySelectorAll("td"), function(value, index) {
                        value.setAttribute("data-title", header_text[index]);
                    });
                });
            }
        }
    };
});



ngDevhres
    .directive('appTitleSearch', function() {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                showInput: '@',
                showLink: '@',
                sref: '@',
                minLength: '@',
                actionMethod: '&',
                term: '@'
            },
            templateUrl: 'app/views/directives/title-search/app_title_search.html',
            link: function(scope, element, attrs) {
                scope.param = {};
                scope.showInput = scope.$eval(attrs.showInput);
                scope.showLink = scope.$eval(attrs.showLink);

                if (scope.minLength) {
                    scope.minLength = parseInt(scope.minLength);
                } else {
                    scope.minLength = 3;
                }

                if (scope.term) {
                    scope.param.q = scope.term;

                } else {
                    scope.param.q = '';
                }

                scope.search = function(query) {
                    if (scope.param.q.length >= scope.minLength) {
                        scope.actionMethod({
                            term: query
                        });
                    }
                };


            }
        }
    });


/*
var myutil = angular.module("myutil", []);

myutil.value("safeValue", "a safe value");

myutil.factory("safeFactory", ['safeValue', function(p1) {
    return { value : p1 };
}]);
function MySafeService(p1){
    this.doIt = function() {
        return "MySafeService.doIt() called: " + p1.value;
    };
}
myutil.service("safeService", ['safeFactory', MySafeService]);

myutil.provider("$safeService2", function() {
    var provider = {};
    provider.$get = ['safeService', function(p1) {
        var service = {};
        service.doService = function() {
            console.log("safeService from provider: " + p1.doIt());
        };
        return service;
    }];
    return provider;
});

*/
