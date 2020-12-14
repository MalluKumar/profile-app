// create a web server
const http = require('http');
const home = require('./router.js');

// 127.0.0.1 represents localhost
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    home.homeRoute(request, response);
    home.userRoute(request, response);
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

