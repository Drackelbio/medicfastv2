app.factory('loginService', function($http, $q, localStorageService, config) {
    var url = config.baseUrl;
    var _authentication = {
        isAuth: true,
        username: "",
        userRetreived: false,
        firstName: '',
        lastName: '',
        email: '',
        roles: []
    };

    var _logOut = function() {
        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.username = "";
        _authentication.userRetreived = false;
        _authentication.firstName = '';
        _authentication.lastName = '';
        _authentication.email = '';
        _authentication.roles.slice(0, _authentication.roles.length);
    };

    var _login = function(loginData) {
        var data = "grant_type=" + config.grant_type +
            "&client_id=" + config.client_id +
            "&client_secret=" + config.client_secret +
            "&username=" + loginData.username +
            "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(url + 'o/token/', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {
            localStorageService.set('authorizationData', {
                token: response.access_token,
                username: loginData.username,
                refreshToken: "",
                useRefreshTokens: false,
            });

            _authentication.isAuth = true;
            _authentication.username = loginData.username;
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
