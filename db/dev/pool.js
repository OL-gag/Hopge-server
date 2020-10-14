var Pool = require('pg');
var dotenv = require('dotenv');

dotenv.config();

const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool.Pool(databaseConfig);

exports.query = function(quertText, params) 
{
    return pool.query(quertText,params);
}

exports.on = function()
{
    return pool.on;
}

exports.end = function() 
{
    return pool.end();
}