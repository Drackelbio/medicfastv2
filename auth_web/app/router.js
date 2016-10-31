app

//==================================
// app main routers
//==================================
    .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/access/signin");

    $stateProvider



    //==================================
    // Not Authorized page
    //==================================
        .state("notauthorized", {
        url: "/notauthorized",
        templateUrl: "app/views/pages/notauthorized.html"
    })

    //==================================
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
    // 404 page
    //==================================


    .state('404', {
        url: '/404',
        templateUrl: 'app/views/pages/404.html'
    })

    //==================================
    // 505 page
    //==================================
    .state('505', {
        url: '/505',
        templateUrl: 'app/views/pages/505.html'
    })




    ;


});
