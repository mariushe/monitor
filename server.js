var http = require("http");
var url = require("url");
var startup = require("./startup");

function onRequest(request, response) {
	startup.startup();
	response.writeHead(200, {"Content-Type":"application/json"});
    response.write("Alive!");
    response.end();
}

http.createServer(onRequest).listen(8888);