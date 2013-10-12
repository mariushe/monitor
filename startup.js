var fs = require('fs');

function readFile(serviceFile, statusFile, handle) {

	fs.readFile(serviceFile, 'utf8', function (errReadingServices, services) {
		fs.readFile(statusFile, 'utf8', function (errReadingStatus, status) {

			if (errReadingStatus && errReadingServices) {
				console.log('Error: ' + errReadingServices + errReadingStatus);
				return;
			}
 
		 	services = JSON.parse(services);
		 	status = JSON.parse(status);

 			handle(services, status);
 		});
	});
}

function writeFile(file, content) {

	fs.writeFile(file, content, function(err) {

    	if(err) {
	        console.log(err);
    	} else {
        	console.log("Generated status file");
    	}
	}); 
}


function generateStatusFile(services, status) {

	generatedContent = status;

	for (var index in services) {
		
		checkIfServiceExistInStatus(services[index]);

		if (index == services.length-1) {
			writeFile("settings/status.json", JSON.stringify(generatedContent, null, 4));		
		}
	}

	function checkIfServiceExistInStatus(service) {
		var alreadyInStatus = 0;

		for (var i in status) {
			if (service.name == status[i].name && service.host == status[i].host ) {
				alreadyInStatus = 1;
			}
		}

		if (!alreadyInStatus) {
			generatedContent.push({
				"name" : service.name,
				"host" : service.host,
				"status" : "PENDING",
				"message" : ""
			});
		}
	}
}

function startup() {
	readFile("settings/services.json", "settings/status.json", generateStatusFile);	
}

exports.startup = startup;