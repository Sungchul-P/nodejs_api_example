const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    // console.log(req.url); // '/', '/users' 등의 요청 URL 출력

    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello, World!\n');
    } else if (req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('User list');
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});