var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.Types.ObjectId;
var schema = mongoose.Schema;

var User = new schema({
	username: {type:String, trim: true},
	standard: String,
	admin:{
		type: Boolean,
		default: false
	},
	exam: ObjectId,
	marks: String
});

module.exports = mongoose.model("User", User);
