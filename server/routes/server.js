var express = require('express');
var router  = express.Router();
var Path    = require('path');

var assetFolder = Path.resolve(__dirname, '../../client');
router.use( express.static(assetFolder) );

// The Catch-all Route. This route is always LAST.
router.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
});

module.exports = router;