app
    .config(function($stateProvider, $urlRouterProvider, ROUTERS) {
        $urlRouterProvider.otherwise("/apps");
        var collectionr = localStorage.getItem("collection");
        var routersStorage = JSON.parse(collectionr);
        console.log('routersStorage::' + JSON.stringify(routersStorage));

        // routersStorage.forEach(function(collection) { // para cargar del localStorage
        ROUTERS.forEach(function(collection) {
            for (var routeName in collection) {
                $stateProvider.state(routeName, collection[routeName]);
            }
        });
    });


app


    .run(function($window, $location, $state) {

        //console.log("window.location " + window.location);
        //console.log("$window.location " + $window.location);
        //console.log("window.location.hash " + window.location.hash);
        //console.log("$location.path() " + $location.path());
        //$state.path('/catalogo/catalogo/categorias');
        //$location.path($location.path()).replace();
        //var url = window.location;
        //$window.location.hash = "#" + $location.path();
        //.replace("#!/","");
        //window.location.hash = $location.path();
        //window.location.hash = "#" + $location.path();
    })
    //==================================
    // app main routers
    //==================================
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {


        

        $stateProvider

        //==================================
        // Page not found
        //==================================
            .state("404", {
            url: "/404",
            data: { page: 'Error 404 Page not found' },
            templateUrl: "app/views/pages/404.html"
        })

        //==================================
        // Not Authorized page
        //==================================
        .state("401_unauthorized", {
            url: "/401_unauthorized",
            templateUrl: "app/views/pages/401_unauthorized.html"
        })

        //==================================401_unauthorized
        // Apps page (Main)
        //==================================
        .state("apps", {
            url: "/apps",
            data: { page: 'Apps page' },
            views: {
                '': {
                    templateUrl: "app/views/pages/apps.tmpl.html"
                },
            }
        })

        //==================================
        // App layout base
        //==================================
        .state('app', {
            url: '/app',
            views: {
                '': {
                    templateUrl: 'app/views/layout.html'
                },
                'aside': {
                    templateUrl: 'app/views/aside.html'
                },
                'content': {
                    templateUrl: 'app/views/content.html'
                }
            }
        })


        //==================================
        // dashboard page
        //==================================
        .state("app.dashboard", {
            url: "/dashboard",
            data: { page: 'Dashboard page' },
            views: {
                '': {
                    templateUrl: "app/views/pages/dashboard.wall.html"
                },
            }
        })


        ;


    });
