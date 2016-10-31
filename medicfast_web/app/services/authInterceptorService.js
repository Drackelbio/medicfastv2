app.factory('authInterceptorService', function($injector, $q, localStorageService, $location, $window, config) {

    var _request = function(configs) {

        configs.headers = configs.headers || {};
        //config.headers.Authorization = 'Bearer vQTQa5kl6m5wlhPTlMj2CeVI0UN957';
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            configs.headers.Authorization = 'Bearer ' + authData.token;
        }

        return configs;
    };

    var _responseError = function(rejection) {
        var loggedIn = false;
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            loggedIn = true;
        }
        console.log("rejection info:" + JSON.stringify(rejection));

        //HTTP_401_UNAUTHORIZED "Las credenciales de autenticación no se proveyeron."
        if (rejection.status === 511 || rejection.status === 401) { // HTTP_511_NETWORK_AUTHENTICATION_REQUIRED
            //var authService = $injector.get('authService');
            //authService.logOut();
            //$location.path('/notauthorized').replace();
            $window.location = config.loginUrl;
        }
        // 403 {"detail":"Usted no tiene permiso para realizar esta acción."}
        if (rejection.status === 403) { //HTTP_403_FORBIDDEN

            //alert("not authorized");
            //$location.path('/401_unauthorized').replace();
            //$window.location = config.loginUrl;
        }

        //We only want to go to the login page if the user is not
        //logged in. If the user is logged in and they get a 401 is
        //because they don't have access to the resource requested.
        // 401 "Las credenciales de autenticación no se proveyeron."
        if (rejection.status === 401 && !loggedIn) { //HTTP_401_UNAUTHORIZED
            //if (rejection.status === 401) { //HTTP_401_UNAUTHORIZED
            var authService = $injector.get('authService');
            authService.logOut();
            $location.path('/401_unauthorized').replace();
            //$window.location = config.loginUrl;
        }
        return $q.reject(rejection);
    };

    return {
        request: _request,
        responseError: _responseError,
    };

});
