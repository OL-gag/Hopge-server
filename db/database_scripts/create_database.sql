-- CREATE ROLE, GRANT,  DATABASE --
-- CREATE ROLE hk WITH LOGIN PASSWORD 'hockey'; -- set as Super USER
-- CREATE DATABASE hopge;   -- set as hk as Owner.

BEGIN TRANSACTION;

CREATE SCHEMA IF NOT EXISTS hpg;

-- CREATE TABLES ---
DROP TABLE IF EXISTS hpg.users, hpg.exercices, hpg.practiceInfo, hpg.practiceDetails  CASCADE;

CREATE TABLE IF NOT EXISTS  hpg.users (
	user_id     SERIAL PRIMARY KEY,
	first_name  varchar(80) NOT NULL,
	last_name   varchar(80),
	email 		varchar(200),
	active		char
);
	
CREATE TABLE IF NOT EXISTS hpg.practiceInfo (
	practice_id SERIAL PRIMARY KEY,
	title VARCHAR(50),
	lenght smallint NULL,
	fullIce boolean,
	user_id SERIAL REFERENCES hpg.users(user_id)
);

CREATE TABLE IF NOT EXISTS hpg.exercices
(
	exercice_id SERIAL PRIMARY KEY,
	exercice_name_fr varchar(75),
	exercice_name_eng varchar(75),
	exercice_description_fr varchar(2000),
	exercice_descrription_eng varchar(2000),
	exercice_note varchar(2000),
	exercice_picture BYTEA,
	exercice_skills varchar(200)
);

CREATE TABLE IF NOT EXISTS hpg.practiceDetails (
	practice_det_id SERIAL PRIMARY KEY,
	pratice_id SERIAL REFERENCES hpg.practiceInfo(practice_id),
	exercice_id SERIAL REFERENCES hpg.exercices(exercice_id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA hpg TO hk;

/* for test */
INSERT INTO hpg.users (first_name, last_name) VALUES ('Generic User','Gen');

COMMIT TRANSACTION;