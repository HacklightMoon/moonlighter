
'use strict';
angular.module("moonlighterApp.userService", [])
  .factory('User', function($http) {
    var User = [];

    // Pull user data for currently signed-in user from db
    const getCurrentUser = () => {
      return $http({
        method: 'GET',
        url: '/user/current'
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error('Error getting current user data:', err);
      });
    };

    // Allow user to edit their user data in the db
    const updateUserInfo = (userData) => {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: userData
      })
      .then((resp) => {
        console.log("Response from update user", resp);
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Get contributions from Github user profile and adds them to db
    const getContribs = () => {
      return $http({
        method: 'GET',
        url: '/user/contribs'
      })
      .then((resp) => {
        return resp.data;
      });
    };

    // Set 'unseenContribs' column in db to zero for current user
    const resetContribs = (userID) => {
      return $http({
        method: 'POST',
        url: '/user/notified',
        data: {
          user_id: userID
        }
      })
      .then((resp) => {
        console.log("Response from reset contribs", resp);
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Look at new and old contribs data to calculate 'unseenContribs'
    const newContribs = (username) => {
      return $http({
        method: 'GET',
        url: '/user/newcontribs?username=' + username
      })
      .then((resp) => {
        return resp.data;
      });
    };

    return {
      getCurrentUser: getCurrentUser,
      updateUserInfo: updateUserInfo,
      getContribs: getContribs,
      resetContribs: resetContribs,
      newContribs: newContribs
    };
  });
