var express = require('express');
var router = express.Router();

/* GET home page. */
console.log("IN INDEX.JS");
router.get('/', function(req, res, next) {
  console.log("IN INDEX.JS ///");
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
