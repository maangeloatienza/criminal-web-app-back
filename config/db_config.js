'use strict';
require('./config').config;

const MASTER_DB = {
  host : MYSQL_HOST || 'localhost',
  user : MYSQL_USER || 'root',
  password : MYSQL_PASSWORD || '12345',
  database : MYSQL_DATABASE || 'criminal_watch_db'
};
module.exports = MASTER_DB;