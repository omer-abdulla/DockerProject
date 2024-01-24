// app.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World I Omer Abdullah From Swizerland  I am Coming On the way to India!\n');
});

const port = 4500;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
