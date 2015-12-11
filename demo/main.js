var Docker = require('dockerode');
var docker = new Docker();
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var containerAttach = require('./attach-container.js');

var containerid = '0fc7c0f73445';
var container = docker.getContainer(containerid);
console.log (container);
containerAttach(containerid, container, io);

server.listen(3000);
