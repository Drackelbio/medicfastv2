app
//=================================================
// LOGIN
//=================================================
    .controller('loginController', function($scope, $location, loginService, config, toastr, $window) {

    $scope.user = {
        username: "",
        password: "",
        useRefreshTokens: false
    };
    $scope.message = "";

    $scope.login = function() {
        loginService.login($scope.user).then(function(response) {
                toastr.success('message', 'Login success');
                //$location.path('/orders');
                $window.location = config.iotecaUrl;
            },
            function(err) {
                $scope.message = err.error_description;
                toastr.error(err.error, $scope.message);
            });
    };

});
