var util = require('util'),
    connect = require('connect'),
    port = 3000,
	directory = 'src/';

connect.createServer(connect.static(directory)).listen(port);
util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
