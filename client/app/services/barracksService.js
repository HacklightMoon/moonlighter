'use strict';
angular.module("moonlighterApp.barracksService", [])

  .factory('Barracks', function($http) {

    var solutionDetail = {};

    function addCwAPI(data) {
      return $http({
        method: 'POST',
        url: '/codewars/api',
        data: data
      })
      .then((resp) => {
        console.log("response from cw API: ", resp);
      })
      .catch((err) => {
        console.error(err);
      })
    }

    function getCodeWar(){
      return $http({
        method: 'GET',
        url: '/codewars'
      })
      .then((resp) => {
        console.log("heres your resp in barracksService", resp)
        return resp
      })
      .catch((err) => {
        console.error(err)
      })
    }


    function cwUserStats(){
      return $http({
        method: 'GET',
        url: '/codewars/user'
      })
      .then((resp) => {
        console.log("heres your resp in barracksService", resp)
        return resp;
      })
      .catch((err) => {
        console.error(err);
      });
    }

    function cwChallenge(challengeType){
      return $http({
        method: 'GET',
        url: '/codewars/nextChallenge?challengeType='+challengeType
      })
      .then((data) => {
        console.log('Challenge data Barracks:41',data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    }

    function cwTestSolution(code){
      return $http({
        method: 'POST',
        url: '/codewars/testSolution?code='+code,
      })
      .then((resp) => {
        console.log("like here is your response in barracksService:", resp);
        return resp
      })
      .catch((err) => {
        console.error(err);
      });
    }

    function cwFinalSolution(){
      return $http({
        method: 'GET',
        url: '/codewars/finalSolution',
      })
      .then((resp) => {
        console.log("cwFinalSolution is a go in barracksService")
        return resp
      })
      .catch((err) => {
        console.error(err)
      });
    }

    return {
      cwFinalSolution: cwFinalSolution,
      getCodeWar: getCodeWar,
      cwUserStats: cwUserStats,
      cwChallenge: cwChallenge,
      addCwAPI: addCwAPI,
      cwTestSolution: cwTestSolution,
    };
});
