(function () {
    'use strict';

    angular
        .module('app.tendereasy')
        .controller('Search', Search);

    Search.$inject = ['dataService'];

    function Search(dataService) {
        var vm = this;
        vm.test = 'from vm';
        activate();

        function activate() {

        }
    }
})();
