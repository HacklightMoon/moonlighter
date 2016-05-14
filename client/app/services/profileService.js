angular.module("moonlighterApp.profileService", [])

  .factory('Profile', function ($http) {

    var Profile = [];

    // Get selected user's profile data from db
    var getProfile = function (user_id) {
      return $http({
        method: 'GET',
        url: '/user/info?id=' + user_id,
        data: user_id
      })
      .then(function (resp) {
        return resp;
      })
      .catch(function (err) {
        console.error(err);
      });
    };

    // Allow user to update their profile information
    var editProfile = function (profile) {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: profile
      })
      .then(function (resp) {
      })
      .catch(function (err) {
        console.error(err);
      });
    };

    // When navigating to a user's profile, store that user_id in the services
    var setUser = function (user_id) {
      Profile.questOwner = user_id;
      return Profile.questOwner;
    };

    // Send user info to profile controller when navigating to the profile view
    var getUser = function () {
      return Profile.questOwner;
    };

    // Get a user's character based on XP and Level
    var getCharacter = function(level){
      return $http({
        method: 'GET', 
        url: '/character?level=' + level, 
      })
      .then(function(resp){
        return resp;
      })
      .catch(function(err){
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

  
