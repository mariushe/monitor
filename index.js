var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {}

handle["/"] = requestHandler.getData;

server.startApplication(router.route, handle);
