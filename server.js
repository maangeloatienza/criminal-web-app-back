'use strict';

const app               = require('./app.js');
const http              = require('http');
const socket            = require('socket.io');

                          require('./config/config').config;

let server = http.createServer(app);

server.listen(process.env.PORT || PORT,()=>{
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
}); 

let io = socket(server);

io.on('connection',(socket)=>{
  console.log('Socket connection established - ',socket.id);
});