
'use strict'
angular.module("moonlighterApp.profileService", [])

  .factory('Profile', function($http) {
    var Profile = [];

    // Get selected user's profile data from db
    const getProfile = (user_id) => {
      return $http({
        method: 'GET',
        url: '/user/info?id=' + user_id,
        data: user_id
      })
      .then((resp) => {
        console.log("heres something in profserv:", resp)
        return resp;
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // Allow user to update their profile information
    const editProfile = (profile) => {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: profile
      })
      .then((resp) => {
      })
      .catch((err) => {
        console.error(err);
      });
    };

    // When navigating to a user's profile, store that user_id in the services
    const setUser = (user_id) => {
      Profile.questOwner = user_id;
      return Profile.questOwner;
    };

    // Send user info to profile controller when navigating to the profile view
    const getUser = () => {
      return Profile.questOwner;
    };

    // Get a user's character based on XP and Level
    const getCharacter = (level) => {
      return $http({
        method: 'GET',
        url: '/character?level=' + level,
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.error(err)
      })
    };

    return {
      getProfile: getProfile,
      editProfile: editProfile,
      getUser: getUser,
      setUser: setUser,
      getCharacter: getCharacter
    };

  });
