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
            if (userName == 'admin' && password == 'admin') {
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
            populateRouteResult(searchResult);
            dfd.resolve(searchResult);
            return dfd.promise;
        }

        function populateRouteResult(searchResult) {
            $window._.each(searchResult, function (res) {
                res.termName = $window._.find(generateTerms(),function (term) {
                    return term.id == res.termId;
                }).name;

                res.unitName = $window._.find(generateUnits(),function (unit) {
                    return unit.id == res.unitId;
                }).name;

                res.totalCost = $window._.reduce(res.routeDetails, function(memo, rDetail){ return memo + rDetail.cost; }, 0);
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
                {id: 1, name: '40\'\' Container'},
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
                {id: 1, termId: 1, unitId: 1, fromCityId: 1, toCityId: 2, numberOfDays: 22, path: 'City 1 - x - y - City 2', routeDetails: [
                    {
                        path: 'City 1 to City x', numberOfDays: 2, cost: 100, vehicle: 'Road Transport', startTime: 'every weekday departure'
                    },
                    {
                        path: 'City x to city y', numberOfDays: 10, cost: 50, vehicle: 'Ocean Freight Low Steaming', startTime: 'every day departure'
                    },
                    {
                        path: 'City y to City 2', numberOfDays: 10, cost: 70, vehicle: 'Road Transport', startTime: '9 AM every morning'
                    }
                ]},
                {id: 2, termId: 1, unitId: 1, fromCityId: 1, toCityId: 2, numberOfDays: 30, path: 'City 1 - m - n - o - - City 2', routeDetails: [
                    {
                        path: 'City 1 to City m', numberOfDays: 15, cost: 100, vehicle: 'Road Transport', startTime: 'monday, tuesday and friday'
                    },
                    {
                        path: 'City m to city n', numberOfDays: 5, cost: 100, vehicle: 'Road Transport', startTime: 'every weekday departure'
                    },
                    {
                        path: 'City n to City o', numberOfDays: 10, cost: 100, vehicle: 'Road Transport', startTime: 'every weekday departure'
                    },
                    {
                        path: 'City o to City 2', numberOfDays: 10, cost: 20, vehicle: 'Road Transport', startTime: ' every weekday departure'
                    }
                ]},
                {id: 3, termId: 1, unitId: 3, fromCityId: 4, toCityId: 5, numberOfDays: 12, path: 'City 4 - a - City 5', routeDetails: [
                    {
                        path: 'City 4 to City a', numberOfDays: 2, cost: 100, vehicle: 'Road Transport', startTime: '9 AM every morning'
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
