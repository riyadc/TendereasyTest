(function () {
    'use strict';

    angular.module('app.tendereasy', ['ngRoute']);

    angular.module('app.tendereasy').config(function($routeProvider, $locationProvider) {
        var routeRoleChecks = {
            user: {auth: function(identityService) {
                //return identityService.isAuthenticated()
                return true;
            }}
        }
        $routeProvider
            .when('/', { templateUrl: 'public/app/login/login.html', controller: 'Login', controllerAs:'vm'})
            .when('/search', { templateUrl: 'public/app/search/search.html',
                controller: 'Search', controllerAs:'vm' , resolve: routeRoleChecks.user
            })
    });

    angular.module('app.tendereasy').run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            if(rejection === 'not authorized') {
                $location.path('/');
            }
        })
    })



})();
