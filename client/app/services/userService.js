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

    var getContribs = function() {
      return $http({
        method: 'GET',
        url: '/user/contribs'
      })
      .then(function(resp) {
        return resp.data;
      })
    }

    var resetContribs = function(userID) {
      return $http({
        method: 'POST',
        url: '/user/notified',
        data: {
          user_id: userID
        }
      })
      .then(function(resp) {
        console.log("Response from reset contribs", resp);
      })
      .catch(function(err){
        console.error(err);
      })
    }

    return {
      getCurrentUser: getCurrentUser,
      updateUserInfo: updateUserInfo,
      getContribs: getContribs,
      resetContribs: resetContribs
    }
  });
