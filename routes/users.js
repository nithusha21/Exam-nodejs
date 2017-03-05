var express = require('express');
var user = require('../models/user.js');
var exam = require('../models/exam.js');
var config = require('../config.js');
var router = express.Router();
var objectID = require('mongoose').Types.ObjectId;
/* GET users listing. */
router.get('/', function(req, res, next) {
	//console.log(req.query);
	user.find({}, function (err, users) {
		res.status(200).json(users);
	});
});
router.get('/:userId', function(req, res, next) {
	user.find({"_id": objectID(req.params.userId)}, function(err, users){
		res.json(users[0]);
	});
});
router.post('/register', function(req, res){
	var name = req.body.username, std = req.body.standard,  examID = objectID(req.body.exam.split(':')[1]);
	console.log(req.body);
	user.find({"username": name, "standard": std}, function(err, users){
		if(users.length != 0){
			res.status(200).end("Already registered! Please proceed to login...");
			//res.status(200).json(req.body);
		}
		else{
			var newUser = new user({username: name, standard: std, exam: examID});
			newUser.save(function(err){
				if(err)
					res.status(500),end("error : " + err);
				res.status(200).redirect("/login.html");
			});
		}
	});
});

router.post('/login', function(req, res) {
	var name = req.body.username, std = req.body.standard;
	user.find({"username": name, "standard": std}, function(err, users){
		if(users.length != 0){
			exam.find({"_id": users[0].exam}, function(err, exams){
				if(exams[0].examType == "MCQ")
					res.status(200).redirect("/exam.html?user="+users[0].id);
				else
					res.status(200).redirect("/subjectiveExam.html?user="+users[0].id);
			});
		}
		else{
			res.status(401).end("Not Authorized!");
		}
	});
});

router.post('/questions', function(req, res){
		var name = req.body.username, pass = req.body.password;
		user.find({"username": name}, function(err, users){
			if(users.length != 0){
				if(users[0].admin == true && pass == config.password)
					res.status(200).end("Success!");
				else {
					res.status(401).end("Not Authorized!");
				}
			}
			else{
				res.status(401).end("Not Authorized!");
			}
		});
});

router.put('/:id/:marks', function(req, res){
	var userId = req.params.id, marks = req.params.marks;
	user.find({"_id": objectID(userId)}, function(err, users){
		var newUser = users[0];
		newUser.marks = marks;
		user.update({"_id": objectID(userId)}, newUser, {upsert: false}, function(err){
			res.end("/result.html?user="+user.id);
		});
	});
});

module.exports = router;
