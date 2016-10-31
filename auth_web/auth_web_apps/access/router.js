app

//==================================
// base routers
//==================================
    .config(function($stateProvider, $urlRouterProvider) {

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
        templateUrl: 'auth_web_apps/access/views/pages/login.html'
    })

    //==================================
    // signup page
    //==================================
    .state('access.signup', {
        url: '/signup',
        templateUrl: 'auth_web_apps/access/views/pages/signup.html'
    })

    //==================================
    // forgot-password page
    //==================================
    .state('access.forgot-password', {
        url: '/forgot-password',
        templateUrl: 'auth_web_apps/access/views/pages/forgot-password.html'
    })

    //==================================
    // lockme page
    //==================================
    .state('access.lockme', {
        url: '/lockme',
        templateUrl: 'auth_web_apps/access/views/pages/lockme.html'
    })

    ;
});
