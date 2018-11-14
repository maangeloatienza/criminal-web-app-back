'use strict';

const express         = require('express');
const bodyParser      = require('body-parser');
const mysql           = require('anytv-node-mysql');                
const dataManagement  = require('./routes/dataManagement');
const app             = express();
const MASTER_DB       = require('./config/db_config');
 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mysql.add('master',MASTER_DB);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Authorization');
  next();
});

app.use('/v1',dataManagement);


app.use('/', (req,res)=>{
  return res.json({
    message : 'Route not found',
    context : 'Route does not exists'
  }).status(404);
});

module.exports = app;