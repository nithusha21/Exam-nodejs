var request = require('request')
var fs = require('fs');
var prompt = require('prompt');

prompt.start();
console.log("\n\tPlease enter complete path of file with the names of students");
console.log("\tPlease note that the file should follow the pattern: ");
console.log("\tfirst line should have Exam name");
console.log("\tsecond line should have class followed by section(capital) without space, eg: 11A");
console.log("\tthen each line having full name of student\n");
prompt.get(['filename'], function(err, result){
	if(err){return onErr(err)};
	fs.readFile(result.filename, 'utf8', function(err, data) {
		//console.log(data);
		var examID = "";
		var lines = data.split(/\r?\n/);
		lines.splice(lines.length - 1, 1);
		var standard = lines[1];
		request.get('http://localhost:3000/exam/all', function(err, data){
			if(!err){
				data = JSON.parse(data['body']);
				for(item of data){
					if(item['name'].valueOf() === lines[0]){
						examID = ":"+item['_id'];
						break;
					}
				}
				console.log(examID+" "+standard);
				for(var i = 2; i < lines.length; i++){
					request.post('http://localhost:3000/users/register',
					{form: {
							username:lines[i], standard:standard, exam: examID
					}});
				}
			}
		});
		//console.log(lines);
	});
});

function onErr(err){
	console.log(err);
	return 1;
}
