(function () {
    'use strict';

    angular
        .module('app.tendereasy')
        .controller('Search', Search);

    Search.$inject = ['dataService', 'identityService'];

    function Search(dataService, identityService) {
        var vm = this;
        //vm.userName = identityService.currentUser.userName;
        vm.userName = 'x';
        vm.cities = [];
        vm.units = [];
        vm.terms = [];
        vm.searchResults = null;
        vm.selectedFilters = {fromCity : null, toCity : null,  term : null, unit : null };
        vm.validationInfo = {isSubmitted: false  };
        vm.getSearchResult = getSearchResult;

        activate();

        function activate() {
            dataService.getCities().then(function(data){
               vm.cities = data;
            });
            dataService.getUnits().then(function(data){
                vm.units = data;
            });
            dataService.getTerms().then(function(data){
                vm.terms = data;
            });
        }

        function getSearchResult(){
            vm.validationInfo.isSubmitted = true;
            if(isValidFilter()){
                dataService.getSearchResult(vm.selectedFilters).then(function(data){
                    vm.searchResults = data;
                    console.log(data);
                });
            }
        }

        function isValidFilter(){
            return vm.selectedFilters.fromCity && vm.selectedFilters.toCity && vm.selectedFilters.term && vm.selectedFilters.unit;
        }
    }
})();
