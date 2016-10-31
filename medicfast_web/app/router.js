app



//==================================
// app main routers
//==================================
    .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/apps");

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
