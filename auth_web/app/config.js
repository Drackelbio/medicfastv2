var baseUrl = 'http://localhost:9000/';
var loginUrl = 'http://localhost:9001/auth_web/';
var iotecaUrl = 'http://localhost:9001/medicfastv2_web/';



var clientId = 'XHJWk31Fzj0uLmx49TZ8zJ1Dti31HAUTKrPNuf65';
var clientSecret = 'Av52eK3zoqO3V58bZ1wEeOFjuQKvT71SAYfpdS2KQZpvBFWV7kIcqJg0gfTkLN6kMnzfPhLyqmKT2RyhLqFn0jg4UhKdCtihQtDSs97YJqinS4OneDZ3ttYHUc806rdR';

//var clientId = 'BtcnWAnOUSJRFsf8FsUXKoKM1AW7gpceaf8EzAdW';
//var clientSecret = 'HBLysSgXM95jr2GY9RBKrNO426Z8Z3pLf6YQxxptLc2q0209Zid04dtaKc25gkDI6SfolMFxFXPmL3NbBWWM5bZvEqO0ZrLo9a0brGX4kxtzvyU4Az3eLw6cfoNeyA0r';
//b7d34f76970a357c3b5ebbdd14aeb54acac9c10b
var grantType = 'password';

var config = {

    baseUrl: baseUrl,
    loginUrl: loginUrl,
    iotecaUrl: iotecaUrl,

    clientId: clientId,
    clientSecret: clientSecret,
    grantType: grantType,

};

app.value('config', config);

app
    .run(function($rootScope, $state, $stateParams, $window, loginService) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        /*******************************agregado**************************/
        console.log("run");

        if (loginService.authentication.isAuth === false) {
            $window.location = loginUrl;
        }
        /******************************************************************/

    })

.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //$httpProvider.interceptors.push('authInterceptorService');
})

.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
