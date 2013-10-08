var http = require("http");
var url = require("url");

function onRequest(request, response) {
	response.writeHead(200, {"Content-Type":"application/json"});
    response.write("Alive!");
    response.end();
}

http.createServer(onRequest).listen(8888);