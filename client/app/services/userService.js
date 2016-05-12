angular.module("moonlighterApp.userService", [])

  .factory('User', function($http) {
    var User = [];

    // Pull user data for currently signed-in user from db
    var getCurrentUser = function() {
      return $http({
        method: 'GET',
        url: '/user/current'
      })
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(err) {
        console.error('Error getting current user data:', err);
      })
    }
    
    // Allow user to edit their user data in the db
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

    // Get contributions from Github user profile and adds them to db
    var getContribs = function() {
      return $http({
        method: 'GET',
        url: '/user/contribs'
      })
      .then(function(resp) {
        return resp.data;
      })
    }

    // Set 'unseenContribs' column in db to zero for current user
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

    // Look at new and old contribs data to calculate 'unseenContribs'
    var newContribs = function(username) {
      return $http({
        method: 'GET',
        url: '/user/newcontribs?username=' + username
      })
      .then(function(resp) {
        return resp.data;
      })
    }

    return {
      getCurrentUser: getCurrentUser,
      updateUserInfo: updateUserInfo,
      getContribs: getContribs,
      resetContribs: resetContribs,
      newContribs: newContribs
    }
  });
