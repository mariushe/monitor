var fs = require('fs');
var spawn = require('child_process').spawn;

function monitorCore() {

	var fileLocked = 0;

	var MONITORED_SERVICES="settings/status.json";
	var SERVICES="settings/services.json";

	var monitorLoop = setInterval(monitor, 2000);

	function persistResult(service, msg, exitcode) {

		function persist() {

			if(fileLocked) {
        		setTimeout(persist, 50);
        		return;
    		}

    		fileLocked = 1;

			fs.readFile(MONITORED_SERVICES, 'utf8', function (err, status) {

				status = JSON.parse(status);

				var toUpdate = status.filter(function(update) {
					return update.name == service.name && update.host == service.host;
				});

				toUpdate[0].status = exitcode;
				toUpdate[0].message = ""+msg;

				fs.writeFile(MONITORED_SERVICES, JSON.stringify(status, null, 4), function(err) {
    				fileLocked = 0;
				});
 			});
 		}

 		persist();
	}

 	function executeCheck(index, status, service) {

 		var result = spawn("./" + service.command, []);

        result.on('exit', function (exitcode, code) {
        	
 			result.stdout.on('data', function (msg) {
 				persistResult(service, msg, exitcode);
        	});
        });
 	}
 
	function iterateServices(services, status) {
		for (var index in status) {

			services.filter(function(toCheck) {
				
				if (toCheck.name == status[index].name && toCheck.host == status[index].host) {
					executeCheck(index, status, toCheck);	
				}
			});
		}
	}

	function monitor() {
		
		fs.readFile(SERVICES, 'utf8', function (errReadingServices, services) {
			fs.readFile(MONITORED_SERVICES, 'utf8', function (errReadingStatus, status) {

				if (errReadingStatus && errReadingServices) {
					console.log('Error: ' + errReadingServices + errReadingStatus);
					return;
				}
 
			 	services = JSON.parse(services);
			 	status = JSON.parse(status);

 				iterateServices(services, status);
 			});
		});
	}
}

exports.monitorCore = monitorCore;