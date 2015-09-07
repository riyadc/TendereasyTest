(function () {
    'use strict';

    angular
        .module('app.tendereasy')
        .factory('dataService', ['$http', '$q', '$window', dataService]);

    function dataService($http, $q, $window) {
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

        function getCities() {
            var dfd = $q.defer();
            dfd.resolve(generateCities());
            return dfd.promise;
        }

        function getUnits() {
            var dfd = $q.defer();
            dfd.resolve(generateUnits());
            return dfd.promise;
        }

        function getTerms() {
            var dfd = $q.defer();
            dfd.resolve(generateTerms());
            return dfd.promise;
        }

        function getSearchResult(filter) {
            var dfd = $q.defer();
            var allRoutes = generateRouteInfo();
            var searchResult = $window._.filter(allRoutes, function (route) {
                return route.fromCityId == filter.fromCity && route.toCityId == filter.toCity && route.termId == filter.term && route.unitId == filter.unit;
            });
            populateUnitAndTermName(searchResult);
            dfd.resolve(searchResult);
            return dfd.promise;
        }

        function populateUnitAndTermName(searchResult) {
            $window._.each(searchResult, function (res) {
                res.termName = $window._.find(generateTerms(),function (term) {
                    return term.id == res.termId;
                }).name;

                res.unitName = $window._.find(generateUnits(),function (unit) {
                    return unit.id == res.unitId;
                }).name;
            });
        }

        function generateTerms() {
            return  [
                {id: 1, name: 'CIF'},
                {id: 2, name: 'FOB'}
            ];
        }

        function generateUnits() {
            return [
                {id: 1, name: 'Unit 1'},
                {id: 2, name: 'Unit 2'},
                {id: 3, name: 'Unit 3'},
                {id: 4, name: 'Unit 4'},
                {id: 5, name: 'Unit 5'}
            ];
        }

        function generateCities() {
            return [
                {id: 1, name: 'City 1'},
                {id: 2, name: 'City 2'},
                {id: 3, name: 'City 3'},
                {id: 4, name: 'City 4'},
                {id: 5, name: 'City 5'}
            ];
        }

        function generateRouteInfo() {
            var routes = [
                {id: 1, termId: 1, unitId: 1, fromCityId: 1, toCityId: 2, totalCost: 220, numberOfDays: 22, path: 'City 1 - x - y - City 2', routeDetails: [
                    {
                        path: 'City 1 to City x', numberOfDays: 2, cost: 100, vehicle: 'Road Transport', startTime: 'Containing every weekday departure'
                    },
                    {
                        path: 'City x to city y', numberOfDays: 10, cost: 50, vehicle: 'Ocean Freight Low Steaming', startTime: '9 AM'
                    },
                    {
                        path: 'City y to City 2', numberOfDays: 10, cost: 70, vehicle: 'Road Transport', startTime: '9 AM'
                    }
                ]},
                {id: 2, termId: 2, unitId: 2, fromCityId: 3, toCityId: 4, totalCost: 220, numberOfDays: 22, path: 'City 3 - m - n - City 4', routeDetails: [
                    {
                        path: 'City 3 to City m', numberOfDays: 2, cost: 100, vehicle: 'Road Transport', startTime: '9 AM'
                    },
                    {
                        path: 'City m to city n', numberOfDays: 10, cost: 50, vehicle: 'Road Transport', startTime: '9 AM'
                    },
                    {
                        path: 'City n to City 4', numberOfDays: 10, cost: 70, vehicle: 'Road Transport', startTime: '9 AM'
                    }
                ]},
                {id: 3, termId: 1, unitId: 3, fromCityId: 4, toCityId: 5, totalCost: 150, numberOfDays: 12, path: 'City 4 - a - City 5', routeDetails: [
                    {
                        path: 'City 4 to City a', numberOfDays: 2, cost: 100, vehicle: 'Road Transport', startTime: '9 AM'
                    },
                    {
                        path: 'City a to city 5', numberOfDays: 10, cost: 50, vehicle: 'Road Transport', startTime: '9 AM'
                    }
                ]}
            ];
            return routes;
        }

    }
})();
