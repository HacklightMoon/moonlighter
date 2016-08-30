let express          = require('express');
let CharacterRouter  = express.Router();
let Character        = require('./../models/characters');

//--------------------Character Endpoints----------------

CharacterRouter.get('/', function(req, res){
  Character.getByLevel(req.query.level)
  .then(function(characters){
    res.send(characters[0]);
  })
  .catch(function(err){
    console.error(err);
  });
});

module.exports = CharacterRouter;

