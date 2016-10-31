app.factory('authService', function($http, $q, localStorageService, config, toastr) {
    var url = config.baseUrl;
    var menu = [];
    var _authentication = {
        isAuth: true,
        username: "",
        userRetreived: false,
        firstName: '',
        lastName: '',
        email: '',
        roles: []
    };

    function getUserInfo() {
        console.log("exec getLocalUserInfoView");
        return $http.get(url + 'api/auths/localuserinfo/');
    }
    /*
    function loadMenu() {
        console.log("exec getUserMenuView");
        //return $http.get(url + 'api/auths/usermenu/');

        var deferred = $q.defer();

        $http.get(url + 'api/auths/usermenu/').success(function(response) {

            menu = response.menu;
            //console.log("menu:" + JSON.stringify(menu));
            //console.log("menu="+menu);
            deferred.resolve(response);

        }).error(function(err, status) {

            deferred.reject(err);
        });

        return deferred.promise;

    }*/


    var _logOut = function() {
        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.username = "";
        _authentication.userRetreived = false;
        _authentication.firstName = '';
        _authentication.lastName = '';
        _authentication.email = '';
        if (_authentication.roles)
            _authentication.roles.slice(0, _authentication.roles.length);

    };


    return {
        fillAuthData: function() {
            var authData = localStorageService.get('authorizationData');
            /*
            loadMenu().then(function(result) {
                var r = result.data;
                //console.log("r=" + r);
            }, function(err) {
                console.log("Error in loadMenu:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
            */

            //if (authData) {
            // _authentication.isAuth = true;
            // _authentication.username = authData.username;
            //if (!_authentication.userRetreived) {
            return getUserInfo().then(function(result) {
                _authentication.userRetreived = true;
                var userData = result.data;
                console.log("is_superuser=" + userData.is_superuser);
                console.log(userData);
                _authentication.email = userData.email;
                _authentication.roles = []; //userData.roles;
                _authentication.firstName = userData.firstName;
                _authentication.lastName = userData.lastName;


            }, function(err) {
                console.log("Error in authService.fillAuthData.getUserInfo():" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
            //}

            //}
            // return $q.when(true);
        },
        logOut: _logOut,
        authentication: _authentication,
        menu: menu,
        getMenu: function() {
            return $http.get(url + 'api/auths/usermenu/').then(function(r) {
                return r;
            });
        },
    };
});




/*
function checkSecurityXX(authService, $q, $location, $window, security, config) {
    var settings = this.settings;
    var deferred = $q.defer();
    authService.fillAuthData().then(function() {
        if (settings) {
            var loginRequired = settings.loginRequired || false;
            var roles = settings.roles || [];
            if (settings.loginRequired) {
                if (!authService.authentication.isAuth) {
                    $window.location = config.loginUrl;
                    //$location.path('/login');
                } else {
                    if (roles.length > 0) {
                        if (!security.checkRole(authService.authentication.roles, roles)) {
                            $location.path('/notauthorized').replace();
                        }
                    }
                }
            }
        }
        deferred.resolve(true); //We want to return just true even if we have to re-route. 
        //If we returned an reject, the the global handler will re-route us to home  
    }, function(error) {
        deferred.reject(error);
    });
    return deferred.promise;
}

*/


app.provider('serverLogService', function() {
    this.loglevel = 'log';
    this.hideLogs = false;
    this.$get = function() {
        var configLevel = this.loglevel;
        var hideLogs = this.hideLogs;
        return {
            log: function(logLevel, message, callback) {
                var logLevelArr = ['log', 'debug', 'info', 'warn', 'error'];
                if (logLevelArr.indexOf(configLevel) <= logLevelArr.indexOf(logLevel)) {
                    //this is where a RESTful server log endpoint should go
                    alert(logLevel + ':' + message);
                    if (!hideLogs) {
                        callback(message);
                    }
                }
            },
            forceShowConsoleLogs: function() {
                hideLogs = false;
            }
        }
    };
    this.setLogLevel = function(value) {
        this.loglevel = value;
    }
    this.hideConsoleLogs = function(value) {
        this.hideLogs = value;
    };
});


app
    .factory("logService", ["$log", "$window, $http", function($log, $window, $http) {

        return ({
            error: function(message) {
                // preserve default behaviour
                $log.error.apply($log, arguments);
                // send server side
                $http({
                    url: "log/logger.txt",
                    method: "PUT",
                    params: angular.toJson({
                        url: $window.location.href,
                        message: message,
                        type: "error"
                    })
                });
            },
            debug: function(message) {
                $log.log.apply($log, arguments);
                $http({
                    url: "log/debug_logger.txt",
                    method: "PUT",
                    params: angular.toJson({
                        url: $window.location.href,
                        message: message,
                        type: "debug"
                    })
                });
            }
        });
    }]);
