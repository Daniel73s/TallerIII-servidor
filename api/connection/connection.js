const {Pool} = require('pg');

const configBD = {
    user:'postgres',
    host:'localhost',
    password:'postgres',
    database:'base'
 }

const pool = new Pool(configBD);

module.exports = pool;
