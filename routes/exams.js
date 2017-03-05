var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var exam = require('../models/exam.js');

router.get('/all', function(req, res, next){
	//console.log("All link");
	exam.find({}, function(err, exams){
		if(err) res.status(304).end(err);
		//console.log("no error");
		//console.log(exams);
		res.json(exams);
	});
});

router.get('/:examid', function(req, res, next) {
  var examId = req.params.examid;
	exam.findById(examId, function(err, exams){
			res.status(200).json(exams);
	});
});


router.post('/', function(req, res){

	var newExam = new exam({"name": req.body.name, "examType": req.body.examType, "questions": req.body.questions});
	console.log(newExam);
	newExam.save(function(err){
		if(err)
			res.end("failed");
		res.json(newExam);
	});
});
 router.post('/withImage', function(req, res){
	 console.log(req.body);
 });
module.exports = router;
