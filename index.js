'use strict';
require('dotenv').config();
const { db } = require('./src/auth/models/index.js');
const server= require('./src/server.js');
db.sync()
  .then(() => {
   server.startup(process.env.PORT);
  });