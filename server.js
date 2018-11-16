'use strict';

const app               = require('./app.js');
const http              = require('http');
                          require('./config/config').config;

// let server = http.createServer(app);

// server.listen(PORT,()=>{
//   console.log(`SERVER LISTENING ON PORT ${PORT}`);
// }); 


const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))