// app.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World I Omer Abdullah From Swizerland SOON !\n');
});

const port = 6500;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
