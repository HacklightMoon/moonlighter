angular.module("moonlighterApp.barracksService", [])

  .factory('Barracks', function ($http) {
      

      // todo delete me !!


      // function getCodeWar(){
      //   return $http({
      //     method: 'GET', 
      //     url: 'https://www.codewars.com/api/v1/users/matjkel',
      //     dataType: 'jsonp',
      //     crossDomain: true, 
      //     // headers: {
      //     //   'Content-Type': 'application/json',
      //     //   'Authorization': 'wUGraBxyPMPbRJAy82dr',
      //     // }
      //   //   beforeSend: function (xhr){ 
      //   //   xhr.setRequestHeader('Authorization', 'wUGraBxyPMPbRJAy82dr');
      //   // }
      //   })
      //   .then(function(resp){
      //     console.log("in the barracksService: ", resp)
      //     return resp.data
      //   })
      //   .catch(function(err){
      //     console.error("your error in barracksService", err)
      //   })
      // }


// todo fix me 
      function getCodeWar(){
        return $http({
          method: 'GET', 
          url: '/codewars'
        })
        .then(function (resp){
          console.log("heres your resp in barracksService", resp)
          return resp
        })
        .catch(function(err){
          console.error(err)
        })
      }





      return {
        getCodeWar: getCodeWar
      }


  })
