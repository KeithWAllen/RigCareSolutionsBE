const http = require('http');
const config = require('./config')
const environment = process.env.NODE_ENV || 'development'
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(config[environment].port, () => console.log(`Listening on port ${config[environment].port}!`))

// const server = http.createServer((req, res) => {
//   console.log("HOT")
// });
//
// server.listen(config[environment].port, config[environment].hostname, () => {
//   console.log(`Server running at http://${config[environment].hostname}:${config[environment].port}/`);
// });
