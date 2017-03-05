var mongoose = require('mongoose');
var schema = mongoose.Schema;

var MCQquestion = new schema({
		question: {type: String, required: true},
		options: {type: [String], required: true},
		answer: {type: String, required: true, validate: [MCQValidator, "Answer must be among options"]}
});

function MCQValidator(value){
	return this.options.indexOf(value) > -1;
}

var question = new schema({
	question: {type: String, required: true},
	answer: {type: String, required: true}
});

var Exam = new schema({
	name: String,
	examType: {type: String, required: true, validate: [typeValidator, "Not a valid exam type"]},
	questions: []
});

function typeValidator(value){
	return ['MCQ', 'Subjective'].indexOf(value) > -1;
}
module.exports = mongoose.model("Exam", Exam);
