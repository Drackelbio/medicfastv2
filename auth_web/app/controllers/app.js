app

    .controller("AppCtrl", function($scope, $mdSidenav, $timeout, $rootScope, $window,
        $document, $log, $mdBottomSheet, $mdToast) {

    // config
    $scope.app = {
        name: 'AUTH',
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
