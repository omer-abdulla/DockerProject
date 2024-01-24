// app.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World I am Omer Abdullah !\n');
});

const port = 9000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
