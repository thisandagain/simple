#!/usr/bin/env node

/**
 * Simple
 *
 * @package simple
 * @author Andrew Sliwinski <andrew@diy.org>
 */

/**
 * Dependencies
 */
var fs      = require('fs'),
    http    = require('http'),
    path    = require('path'),
    url     = require('url'),
    command = require('commander'),
    mime    = require('mime');

/**
 * Process arguments
 */
command
    .version('0.1.0')
    .option('-p, --port [port]', 'Server port [8000]', 8000)
    .option('-h, --host [host]', 'Hostname [127.0.0.1]', '127.0.0.1')
    .option('-d, --default [filename]', 'Default index [index.html]', 'index.html')
    .option('-s, --silent', 'Silent mode')
    .parse(process.argv);

/**
 * Logger
 */
var log = function (req, uri, code) {
    if (!command.silent) {
        var client  = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var stamp   = '[' + new Date().toUTCString() + ']';
        var request = '"' + req.method + ' ' + uri + ' HTTP/1.1" ' + code;
        console.log(client + ' - - ' + stamp + ' ' + request + ' -');
    }
};

/**
 * HTTP server
 */
http.createServer(function (req, res) {
    // Request URI
    var uri         = url.parse(req.url).pathname;

    // Default index
    if (uri === '/') {
        uri = command.default;
    }
    
    // Path relative to process
    var filename    = path.join(process.cwd(), uri);

    // Check for file existence
    path.exists(filename, function(exists) {
        
        // 404
        if (!exists) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
            log(req, uri, 404);
            return;
        }

        // 200
        res.writeHead(200, {'Content-Type': mime.lookup(filename)});
        fs.createReadStream(filename).pipe(res);
        log(req, uri, 200);
    });
}).listen(command.port, command.host);

/**
 * Listening
 */
console.log('Serving HTTP on ' + command.host + ' port ' + command.port + ' ...');
