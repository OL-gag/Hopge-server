//import pool from './pool.js';
//var pool = require('./pool.js');
//var Pool = require('pg');
//var dotenv = require('dotenv');
var pool = require('./pool.js');
/*exports.myDateTime = function () {
    return Date();
  };*/
exports.query = function(quertText, params) {
    return new Promise((resolve, reject) => {
         pool.query(quertText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };


  /*WORK
  /import pool from './pool.js';
//var pool = require('./pool.js');
var Pool = require('pg');
var dotenv = require('dotenv');
//var pool = require('./pool.js');
/*exports.myDateTime = function () {
    return Date();
  };
exports.query = function(quertText, params) {
    return new Promise((resolve, reject) => {
        dotenv.config();
        const databaseConfig = { connectionString: process.env.DATABASE_URL };
        const pool = new Pool.Pool(databaseConfig);
        pool.query(quertText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  */