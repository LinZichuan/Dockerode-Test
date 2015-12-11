var Docker = require('dockerode');
var socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
var docker = new Docker({socketPath: socket});
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
global.io = require('socket.io').listen(server);

docker.listImages({}, function(err, data) {
    console.log (data);   
});
var containerid = '0fc7c0f73445';
var container = docker.getContainer(containerid);

container.attach({
        stream: true,
        stdout: true,
        stderr: true,
        stdin: true
    },
    function(err, dockerStream) {
        if (err) {
            console.log ("ERROR!@!");
        }
        //console.log (dockerStream);
        dockerStream.pipe(process.stdout);
        //container.modem.demuxStream(dockerStream, process.stdout, process.stderr);
        //var ioConnection = io.of('/tty/' + containerid);
        //ioConnection.on('connection', function(socket) {
        //    console.log('docker-socket connected');
        //})
    }
)
app.get('/term', 
        function(req, res, next){
            res.sendFile(path.join(__dirname, '/index.html'));   
        });
server.listen(3000);

