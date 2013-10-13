var fs = require("fs");
var querystring = require("querystring");
var sys = require('sys')
var exec = require('child_process').exec;

function application(query, response) {
    var body = fs.readFileSync("assets/js/application.js");

    response.writeHead(200, {"Content-Type":"text/JavaScript"});
    response.write(body);
    response.end();
}

function bootstrap(query, response) {
    var body = fs.readFileSync("assets/css/bootstrap.min.css");

    response.writeHead(200, {"Content-Type":"text/css"})
    response.write(body);
    response.end();
}

function css(query, response) {
    var body = fs.readFileSync("assets/css/application.css");

    response.writeHead(200, {"Content-Type":"text/css"})
    response.write(body);
    response.end();
}


function getData(query, response) {
    var body = fs.readFileSync("settings/status.json");

    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(body);
    response.end();
}

function getMonitor(query, response) {
    var body = fs.readFileSync("assets/monitor.html");

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();
}


exports.application = application;
exports.getData = getData;
exports.getMonitor = getMonitor;
exports.bootstrap = bootstrap;
exports.application = application;
exports.css = css;
