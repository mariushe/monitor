var http = require("http");
var url = require("url");
var startup = require("./startup");
var core = require("./core");

function onRequest(request, response) {
	
	response.writeHead(200, {"Content-Type":"application/json"});
    response.write("Alive!");
    response.end();
}

startup.startup();
core.monitorCore();

http.createServer(onRequest).listen(8888);