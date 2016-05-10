angular.module("moonlighterApp.profileService", [])

  .factory('Profile', function ($http) {

    var Profile = [];
    // get user profile
    var getProfile = function (user_id) {
      console.log("Sending user_id - services.js", user_id);
      return $http({
        method: 'GET',
        url: '/user/info?id=' + user_id,
        data: user_id
      })
      .then(function (resp) {
        console.log("Got Profile: ", resp);
        return resp;
      })
      .catch(function (err) {
        console.error(err);
      });
    };

    var editProfile = function (profile) {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: profile
      })
      .then(function (resp) {
        console.log("edited profile: ", resp);
      })
      .catch(function (err) {
        console.error(err);
      });
    };

    var setUser = function (user_id) {
      Profile.questOwner = user_id;
      return Profile.questOwner;
    };

    var getUser = function () {
      return Profile.questOwner;
    };

    var getCharacter = function(){
      console.log("called in profileServices.js, trying to get character");
      return $http({
        method: 'GET', 
        url: '/character', 
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

  
