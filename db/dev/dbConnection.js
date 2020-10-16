var pool = require('./pool.js');


//const { pool } = require('./pool')
pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */
const createUserTable = () => {

   const userCreateQuery = `CREATE TABLE IF NOT EXISTS hpg.users
  (user_id  SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  active		char,
  created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Buses Table
 */
const createPracticeInfoTable = () => {
  const practiceInfoCreateQuery = `CREATE TABLE IF NOT EXISTS hpg.practiceInfo (
    practice_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    lenght smallint NULL,
    fullIce boolean,
    user_id SERIAL REFERENCES hpg.users(user_id)
    )`;
   

  pool.query(practiceInfoCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Trip Table
 */
const createExercicesTable = () => {
  const exericeCreateQuery = `CREATE TABLE IF NOT EXISTS hpg.exercices
  (
      exercice_id SERIAL PRIMARY KEY,
      exercice_name_fr varchar(75),
      exercice_name_eng varchar(75),
      exercice_description_fr varchar(2000),
      exercice_descrription_eng varchar(2000),
      exercice_note varchar(2000),
      exercice_picture BYTEA,
      exercice_skills varchar(200)
  )`;

  pool.query(exericeCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Booking Table
 */
const createPracticeDetailsTable = () => {
  const practiceDetailsCreateQuery = `CREATE TABLE IF NOT EXISTS hpg.practiceDetails (
	practice_det_id SERIAL PRIMARY KEY,
	pratice_id SERIAL REFERENCES hpg.practiceInfo(practice_id),
	exercice_id SERIAL REFERENCES hpg.exercices(exercice_id)
    )`;

    pool.query(practiceDetailsCreateQuery)
        .then((res) => {
        console.log(res);
        pool.end();
        })
        .catch((err) => {
        console.log(err);
        pool.end();
        });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS hpg.users CASCADE';
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop hpg.practiceInfo
 */
const dropPracticeInfoTable = () => {
  const practiceInfoDropQuery = 'DROP TABLE IF EXISTS hpg.practiceInfo CASCADE';
  pool.query(practiceInfoDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Trip Table
 */
const dropExercicesTable = () => {
  const exercicesDropQuery = 'DROP TABLE IF EXISTS hpg.exercices CASCADE';
  pool.query(exercicesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Bus Table
 */
const dropPracticeDetailsTable = () => {
  const practiceDetDropQuery = 'DROP TABLE IF EXISTS hpg.practiceDetails CASCADE';
  pool.query(practiceDetDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
 // createPracticeInfoTable();
 // createExercicesTable();
 // createPracticeDetailsTable();  
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
 // dropPracticeDetailsTable();
 // dropExercicesTable();
 // dropPracticeInfoTable();
  dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


Module.exports = {
  createAllTables,
  dropAllTables
};

require('make-runnable');