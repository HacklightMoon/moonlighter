angular.module("moonlighterApp.userService", [])

  .factory('User', function($http) {
    var User = [];

    var getCurrentUser = function() {
      return $http({
        method: 'GET',
        url: '/user/current'
      })
      .then(function(resp) {
        return resp.data;
      })
      // .catch(function(err) {
      //   console.error(err);
      // })
    }

    var updateUserInfo = function(userData) {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: userData
      })
      .then(function(resp) {
        console.log("Response from update user", resp);
      })
      .catch(function(err){
        console.error(err);
      })
    }

    return {
      getCurrentUser: getCurrentUser,
      updateUserInfo: updateUserInfo
    }
  });
