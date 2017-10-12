var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("IN INDEX.JS");
router.get('/', function(req, res, next) {
  console.log("IN INDEX.JS ///");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
