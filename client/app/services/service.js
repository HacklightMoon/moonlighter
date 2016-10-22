
'use strict';
angular.module("moonlighterApp.services", [])
  .factory('Profile', function($http) => {

    var Profile = [];
    // get user profile
    const getProfile = (user_id) => {
      console.log("Sending user_id - services.js", user_id);
      return $http({
        method: 'GET',
        url: '/user/info?id=' + user_id,
        data: user_id
      })
      .catch((err) => {
        console.error(err);
      });
    };

    const editProfile = (profile) => {
      return $http({
        method: 'POST',
        url: '/user/update',
        data: profile
      })
      .catch((err) => {
        console.error(err);
      });
    };

    const setUser = (user_id) => {
      Profile.questOwner = user_id;
      return Profile.questOwner;
    };

    const getUser = () => {
      return Profile.questOwner;
    };

    const getCharacter = () => {
      return $http({
        method: 'GET',
        url: '/character'
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        console.error("ERROR : ", err);
      })
    };

    return {
      getProfile: getProfile,
      editProfile: editProfile,
      getUser: getUser,
      setUser: setUser,
      getCharacter: getCharacter
    };
  })
  .factory('User', ($http) => {
    var User = [];

    const getCurrentUser = () => {
      return $http({
        method: 'GET',
        url: '/user/current'
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      });
    };

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

    const getContribs = () => {
      return $http({
        method: 'GET',
        url: '/user/contribs'
      })
      .then((resp) => {
        return resp.data;
      });
    };

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
      })
    }

    return {
      getCurrentUser: getCurrentUser,
      updateUserInfo: updateUserInfo,
      getContribs: getContribs,
      resetContribs: resetContribs
    };
  })

  .factory('Issues', ($http) => {
    var Issues = [];

    const getAllIssues = () => {
      return $http({
        method: 'GET',
        url: '/issues/load',
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      });
    };

    const loadIssues = () => {
      return $http({
        method: 'GET',
        url: '/issues',
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      });
    };

    const getIssue = () => {
      return Issues.currentIssue;
    }

    const setIssue = (issue) => {
      Issues.currentIssue = issue;
      return Issues.currentIssue;
    }

    const addMember = (issueID, userID) => {
      return $http({
        method: 'POST',
        url: '/issues/addmember',
        data: {
          issue_id: issueID,
          user_id: userID
        }
      })
      .then((data) => {
        console.log("data in addMember service.js: ", data);
      })
      .catch((err) => {
        console.error(err);
      })
    }

    const getMyIssues = (userID) => {
      return $http({
        method: 'GET',
        url: '/issues/myissues?id=' + userID
      })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      })
    }

    const getBounty = (issueID) => {
      return $http({
        method: 'GET',
        url: '/issues/bounty?id=' + issueID
      })
      .then((resp) => {
        console.log('Response in service.js: ', resp);
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      })
    }

    const getMembers = (issueID) => {
      return $http({
        method: 'GET',
        url: '/issues/members?id=' + issueID
      })
      .then((resp) => {
        console.log('Response in service.js: ', resp);
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      })
    }

    const payAndClose = (userID, amount, issueID) => {
      return $http({
        method: 'POST',
        url: '/user/pay',
        data: {
          user_id: userID,
          amount: amount,
          issue_id: issueID
        }
      })
      .then((resp) => {
        console.log('Response in service.js: ', resp);
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      })
    }

    const getJoinedIssues = (userID) => {
      return $http({
        method: 'GET',
        url: '/issues/joined?id=' + userID
      })
      .then((resp) => {
        console.log('Response in service.js: ', resp);
        return resp.data;
      })
      .catch((err) => {
        console.error(err)
      })
    }

    return {
      getAllIssues: getAllIssues,
      loadIssues: loadIssues,
      getIssue: getIssue,
      setIssue: setIssue,
      addMember: addMember,
      getMyIssues: getMyIssues,
      getBounty: getBounty,
      getMembers: getMembers,
      payAndClose: payAndClose,
      getJoinedIssues: getJoinedIssues
    }
  })
