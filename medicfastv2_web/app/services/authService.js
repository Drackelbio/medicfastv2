app.factory('authService', function($http, $q, localStorageService, config, toastr) {
    var url = config.baseUrl;
    var menu = [];
    var _authentication = {
        isAuth: true,
        userName: "",
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
        _authentication.userName = "";
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
            // _authentication.userName = authData.userName;
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

