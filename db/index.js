/*import { Pool } from 'pg';
import dotenv from 'dotenv';*/
const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool();

var dotenv = require('dotenv');
dotenv.config();
//var app = express();

pool.connectionString = process.env.DATABASE_URL;
/*{
  connectionString: 
});*/

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

