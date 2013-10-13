var http = require("http");
var url = require("url");
var startup = require("./startup");
var core = require("./core");

function startApplication(route, handle) {
    function onRequest(request, response) {

    	var requestUrl = url.parse(request.url, true);
        var pathname = requestUrl.pathname;
        var query = requestUrl.query;

        console.log("Request received.");

        route(handle, pathname, query, response);
    }

    startup.startup();
	core.monitorCore();

    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.startApplication = startApplication;