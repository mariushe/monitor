var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {}


handle["/"] = requestHandler.getMonitor;
handle["/get-data"] = requestHandler.getData;
handle["/assets/js/application.js"] = requestHandler.application;
handle["/assets/css/application.css"] = requestHandler.css;
handle["/assets/css/bootstrap.min.css"] = requestHandler.bootstrap;
handle["/assets/js/bootstrap.min.js"] = requestHandler.bootstrapJs;

server.startApplication(router.route, handle);
