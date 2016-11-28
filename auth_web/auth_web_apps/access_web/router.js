app
    .provider('router', function($stateProvider) {
        var urlCollection;
        this.$get = function($http, $state) {
            return {
                setUpRoutes: function() {
                    $http.get(urlCollection).success(function(collection) {
                        // solo para subibr el json al localStorage
                        localStorage.setItem('collection', JSON.stringify(collection));
                        /*for (var routeName in collection) { // activar el for para generar router dinámicos aquí
                            if (!$state.get(routeName)) {
                                $stateProvider.state(routeName, collection[routeName]);
                            }
                        }*/
                    });
                }
            };
        };
        this.setCollectionUrl = function(url) {
            urlCollection = url;
        };
    });

app
    .run(function(router) {
        // no recupera el foco porque el run se genera después del config
        router.setUpRoutes(); // activar para generar router dinámicos aquí
    })
    //==================================
    // base routers
    //==================================
    .config(function($stateProvider, $urlRouterProvider, routerProvider) {


        routerProvider.setCollectionUrl('http://localhost:9000/api/auths/routers/');

        $stateProvider




        //==================================
        // access page
        //==================================
            .state('access', {
            url: '/access',
            template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
        })

        //==================================
        // signin page
        //==================================
        .state('access.signin', {
            url: '/signin',
            controller: "loginController",
            templateUrl: 'auth_web_apps/access_web/views/pages/login.html'
        })

        //==================================
        // signup page
        //==================================
        .state('access.signup', {
            url: '/signup',
            templateUrl: 'auth_web_apps/access_web/views/pages/signup.html'
        })

        //==================================
        // forgot-password page
        //==================================
        .state('access.forgot-password', {
            url: '/forgot-password',
            templateUrl: 'auth_web_apps/access_web/views/pages/forgot-password.html'
        })

        //==================================
        // lockme page
        //==================================
        .state('access.lockme', {
            url: '/lockme',
            templateUrl: 'auth_web_apps/access_web/views/pages/lockme.html'
        })

        ;
    });
