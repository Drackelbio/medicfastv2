app

    .controller("AppCtrl", function($scope, $mdSidenav, $timeout, $rootScope, $window,
    $document, $log, menuService, $mdBottomSheet, $mdToast, $location, toastr, authService, config) {

    toastr.success('Consumer sign in successfully', 'Message');


    $scope.menu = menuService;
    // config
    $scope.app = {
        name: 'IOTECA',
        version: '1.0.1',

        setting: {
            theme: {
                primary: 'indigo',
                accent: 'purple',
                warn: 'amber'
            },
            asideFolded: false
        },
        search: {
            content: '',
            show: false
        }
    };

    $scope.logOut = function() {
        console.log("logOut");
        authService.logOut();
        //$window.location="../accounts/";
        $window.location = config.loginUrl;

    };


    $scope.setTheme = function(theme) {
        $scope.dynamicTheme = theme;
        $scope.app.setting.theme = theme;
    };



    $rootScope.$on('$stateChangeSuccess', openPage);

    function openPage() {
        $scope.closeAside();
    }

    $scope.goBack = function() {
        $window.history.back();
    };

    $scope.openAside = function() {
        console.log("open aside");
        $timeout(function() { $mdSidenav('aside').open(); });
    };
    $scope.closeAside = function() {
        console.log("close aside");
        $timeout(function() { $document.find('#aside').length && $mdSidenav('aside').close(); });
    };

});
