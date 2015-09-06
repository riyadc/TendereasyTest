(function () {
    'use strict';

    angular
        .module('app.tendereasy')
        .controller('Login', Login);

    Login.$inject = ['dataService', '$location', 'identityService'];

    function Login(dataService, $location, identityService) {
        var vm = this;
        vm.signin = signin;

        function signin() {
            return dataService.checkLogin(vm.userName, vm.password).then(function () {
                identityService.currentUser = {userName: vm.userName};
                $location.path('/search');
            }, function(){
                alert('login failed');
            });
        }
    }
})();
