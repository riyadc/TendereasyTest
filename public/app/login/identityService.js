angular.module('app.tendereasy').factory('identityService', function($q) {
    var currentUser;
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            if(!!this.currentUser) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
})