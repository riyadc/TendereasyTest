(function () {
    'use strict';

    angular
        .module('app.tendereasy')
        .controller('Login', Login);

    Login.$inject = ['dataService', '$location', 'identityService'];

    function Login(dataService, $location, identityService) {
        var vm = this;
        vm.signin = signin;
        vm.validationInfo = {isSubmitted: false, isValidLogin: true  };

        function signin() {
            vm.validationInfo.isSubmitted = true;
            return dataService.checkLogin(vm.userName, vm.password).then(function () {
                identityService.currentUser = {userName: vm.userName};
                vm.validationInfo.isValidLogin = true;
                $location.path('/search');
            }, function(){
                vm.validationInfo.isValidLogin = false;
            });
        }
    }
})();
