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

function getData(query, response) {
    var body = fs.readFileSync("settings/status.json");

    response.writeHead(200, {"Content-Type":"application/json"});
    response.write(body);
    response.end();
}

exports.application = application;
exports.getData = getData;
