'use strict';

const app               = require('./app.js');
const http              = require('http');
                          require('./config/config').config;

let server = http.createServer(app);

server.listen(PORT,()=>{
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
}); 