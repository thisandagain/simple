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
    .option('-d, --default [filename]', 'Default index [index.html]', 'index.html')
    .parse(process.argv);

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
            return;
        }

        // 200
        res.writeHead(200, {'Content-Type': mime.lookup(filename)});
        fs.createReadStream(filename).pipe(res);

    });
}).listen(command.port);

/**
 * Listening
 */
console.log('Serving HTTP on 0.0.0.0 port ' + command.port + ' ...');
