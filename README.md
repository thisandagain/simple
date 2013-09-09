# Simple
### HTTP all the things!

Simple is a binary created using Node.js that clones some of the functionality of Python's `simpleHttpServer`. It's a rather naive and simple static HTTP server, but it gets the job done in a pinch. Please don't use this in production... it's a development tool. Really.

#### Installation
```bash
npm install -g simple
```

#### Basic Use
```bash
cd /my/awesome/website
simple
```
```bash
Serving HTTP on 0.0.0.0 port 8000 ...
```

#### Options
`-p` Port to listen on (defaults to 8000)

`-h` Hostname to listen on (defaults to 127.0.0.1)

`-d` Default index (defaults to `index.html`)

`-s` Silent mode

`-h` Help