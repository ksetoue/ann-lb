'use strict'
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello, World!');  //return IP from server
});
server.listen(process.argv[2]);
