const http = require('http');

const server = http.createServer((req, res) => {
  res.end("port 18000");  //return IP from server
});
server.listen(18000);
