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

function writeFile(file, content) {

	fs.writeFile(file, content, function(err) {

    	if(err) {
	        console.log(err);
    	} else {
        	console.log("The file was saved!");
    	}
	}); 
}

function generateStatusFile(services) {

	generatedContent = [];

	for (var index in services) {
		generatedContent.push({
			"name" : services[index].name
		});

		if (index == services.length-1) {
			writeFile("settings/status.json", JSON.stringify(generatedContent, null, 4));		
		}
	}
}

function startup() {
	readFile("settings/services.json", generateStatusFile);	
}

exports.startup = startup;