var fs = require('fs');

function readFile(file, handle) {
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}
 
 	var fileContent = JSON.parse(data);

 	handle(fileContent);
 	});
}

function generateStatusFile(services) {
	for (var index in services) {
		console.log(services[index].name);
	}	
}

function startup() {
	readFile("settings/services.json", generateStatusFile);	
}

exports.startup = startup;