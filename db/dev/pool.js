var Pool = require('pg');
var dotenv = require('dotenv');

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool.Pool(databaseConfig);

exports.query = function(quertText, params) 
{
    return pool.query(quertText,params);
},

exports.on = function(event, listener)
{
    console.log("in pool.on : ", event.name);
    pool.on(event, listener);
},

exports.end = function() 
{
    //pool.end();
    console.log("END exports.end = function()  ", databaseConfig);
}