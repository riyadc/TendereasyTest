(function () {
    'use strict';

    angular
        .module('app.tendereasy')
        .factory('dataService', ['$http', '$q', dataService]);

    function dataService($http, $q) {
        var service = {
            checkLogin: checkLogin
        };

        return service;


        function checkLogin(userName, password) {
            var dfd = $q.defer();
            if (userName == 'a' && password == 'a') {
                dfd.resolve();
            } else {
                dfd.reject('invalid login');
            }
            return dfd.promise;
        }


    }
})();
