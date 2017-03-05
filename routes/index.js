var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query.name);
  //res.render("/index.html");
	res.send("name is : " + req.query.name);
});

module.exports = router;
