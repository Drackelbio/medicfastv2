app

//==================================
// auths routers
//==================================
    .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider




    //==================================
    // auths layout base
    //==================================
        .state('auths', {
        url: '/auths',
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
    // auths system page
    //==================================
    .state('auths.system', {
        url: '/system',
        template: '<div ui-view ></div>'
    })


    //==================================
    // url ct
    //==================================
    .state("auths.system.ct", {
        url: "/ct",
        data: { section: 'System', page: 'Document' },
        templateUrl: "app/views/pages/document.html"
    })

    //==================================
    // url categoria
    //==================================
    .state("auths.system.categoria", {
        url: "/categoria",
        data: { section: 'System', page: 'Categoría' },
        templateUrl: "ioteca_web_apps/auths/views/categoria/index.html"
    })

    .state('auths.hierarchy', {
        url: '/hierarchy',
        template: '<div ui-view ></div>'
    })

     .state("auths.hierarchy.hierarchy_type", {
        url: "/hierarchy_type",
        data: { section: 'Hierarchys', page: 'Hierarchy Type' },
        templateUrl: "ioteca_web_apps/auths/views/hierarchy_type/index.html"
    })

    .state("auths.system.permission", {
        url: "/permission",
        data: { section: 'System', page: 'Permisos' },
        templateUrl: "ioteca_web_apps/auths/views/permission/index.html"
    })
    .state("auths.system.contenttype", {
        url: "/contenttype",
        data: { section: 'System', page: 'Aplicaciones' },
        templateUrl: "ioteca_web_apps/auths/views/contenttype/index.html"
    })

    //==================================
    // url Menú
    //==================================

    .state("auths.system.menu", {
        url: "/menu",
        data: { section: 'System', page: 'Menú' },
        templateUrl: "ioteca_web_apps/auths/views/menu/index.html",

        settings: {
            //loginRequired: true,
            //roles: ['User'],

        },
        resolve: {
            //checkSecurity: checkSecurity,
        },
    });

});
