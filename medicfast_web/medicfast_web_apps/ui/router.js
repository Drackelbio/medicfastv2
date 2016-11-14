

app
//==================================
// ui app routers
//==================================
    .config(function($stateProvider) {

    $stateProvider
    //==================================
    // ui layout base
    //==================================
        .state('ui', {
        url: '/ui',
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
    // test1
    //==================================
    .state("ui.Diagnostico", {
        url: "/Diagnostico",
        data: { section: 'UI', page: 'Diagnostico ' },
        settings: {
            //loginRequired: true,
            //roles: ['User'],
        },
        templateUrl: "medicfast_web_apps/ui/views/tests/Diagnostico.html",
        resolve: {
            //checkSecurity: checkSecurity,
        },

    })

    //==================================
    // test
    //==================================
    .state("ui.test2", {
        url: "/test2",
        data: { page: 'Test 2' },
        templateUrl: "medicfast_web_apps/ui/views/tests/test2.html",
        resolve: {
            //checkSecurity: checkSecurity,
        },
        settings: {
            //loginRequired: false,
            //roles: ['User2'],
        },
    })

    //==================================
    // test3
    //==================================
    .state("ui.test3", {
        url: "/test3",
        data: { page: 'Test 3' },
        templateUrl: "medicfast_web_apps/ui/views/tests/test3.html"
    })

    //==================================
    // test4
    //==================================
    .state("ui.test4", {
        url: "/test4",
        data: { section: 'UI', page: 'Test 4' },
        templateUrl: "medicfast_web_apps/ui/views/tests/test4.html"
    })
    //==================================
    // test5pagination
    //==================================
    .state("ui.test5", {
        url: "/test5",
        data: { section: 'UI', page: 'Test 5' },
        templateUrl: "medicfast_web_apps/ui/views/tests/test5pagination.html"
    })
    //==================================
    // test7pagination
    //==================================
    .state("ui.test7", {
        url: "/test7",
        data: { section: 'UI', page: 'Test 7' },
        templateUrl: "medicfast_web_apps/ui/views/tests/test7.html"
    })
    //==================================
    // test6directivas
    //==================================
    .state("ui.dir", {
        url: "/dir",
        data: { section: 'UI', page: 'Test 6 directivas' },
        templateUrl: "medicfast_web_apps/ui/views/tests/test6dir.html"
    })


    ;
});
