app.factory('loginService', function($http, $q, localStorageService, config) {
    var url = config.baseUrl;
    var _authentication = {
        isAuth: true,
        userName: "",
        userRetreived: false,
        firstName: '',
        lastName: '',
        email: '',
        roles: []
    };

    var _logOut = function() {
        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.userRetreived = false;
        _authentication.firstName = '';
        _authentication.lastName = '';
        _authentication.email = '';
        _authentication.roles.slice(0, _authentication.roles.length);
    };

    var _login = function(loginData) {
        var data = "grant_type=" + config.grantType +
            "&client_id=" + config.clientId +
            "&client_secret=" + config.clientSecret +
            "&username=" + loginData.userName +
            "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(url + 'o/token/', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            localStorageService.set('authorizationData', {
                token: response.access_token,
                userName: loginData.userName,
                refreshToken: "",
                useRefreshTokens: false,
            });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.userRetreived = false;

            deferred.resolve(response);

        }).error(function(err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;
    };

    return {
        fillAuthData: "",
        login: _login,
        logOut: _logOut,
        authentication: _authentication,
        saveRegistration: "_saveRegistration",
    };
});
