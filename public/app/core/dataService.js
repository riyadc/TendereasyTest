(function () {
    'use strict';

    angular
        .module('app.tendereasy')
        .factory('dataService', ['$http', '$q', dataService]);

    function dataService($http, $q) {
        var service = {
            checkLogin: checkLogin,
            getCities: getCities,
            getUnits: getUnits,
            getTerms: getTerms,
            getSearchResult: getSearchResult
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

        function getCities(){
            var dfd = $q.defer();
            var cities = [
                {id: 1, name: 'City 1'},
                {id: 1, name: 'City 2'},
                {id: 1, name: 'City 3'},
                {id: 1, name: 'City 4'},
                {id: 1, name: 'City 5'}
            ];
            dfd.resolve(cities);
            return dfd.promise;
        }

        function getUnits(){
            var dfd = $q.defer();
            var cities = [
                {id: 1, name: 'Unit 1'},
                {id: 1, name: 'Unit 2'},
                {id: 1, name: 'Unit 3'},
                {id: 1, name: 'Unit 4'},
                {id: 1, name: 'Unit 5'}
            ];
            dfd.resolve(cities);
            return dfd.promise;
        }

        function getTerms(){
            var dfd = $q.defer();
            var cities = [
                {id: 1, name: 'Term 1'},
                {id: 1, name: 'Term 2'},
                {id: 1, name: 'Term 3'},
                {id: 1, name: 'Term 4'},
                {id: 1, name: 'Term 5'}
            ];
            dfd.resolve(cities);
            return dfd.promise;
        }

        function getSearchResult(){
            var dfd = $q.defer();
            dfd.resolve([]);
            return dfd.promise;
        }

    }
})();
