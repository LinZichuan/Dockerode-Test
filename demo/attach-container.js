module.exports = function(containerid, container, io) {
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
            console.log ('ready to connect...');
            console.log (io);
            var ioConnection = io.of('tty/' + containerid);
            ioConnection.on('connection', function(socket) {
                console.log('docker-socket connected');
            })
            //dockerStream.on('data', function(trunk) {
            //    console.log(trunk);
            //});
            io.connect('localhost:3000/tty/' + containerid);
        }
    )
}

