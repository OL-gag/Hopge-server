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
	practice_id SERIAL REFERENCES hpg.practiceInfo(practice_id),
	exercice_id SERIAL REFERENCES hpg.exercices(exercice_id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA hpg TO hk;

/* for test */
INSERT INTO hpg.users (first_name, last_name) VALUES ('Generic User','Gen');


INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 1','Exercise 1','Allez','Go','Faire', 'Patin');

INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 2','Exercise 2','Allez','Go','Faire', 'Lancer');

INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 3','Exercise 3','Allez','Go','Faire', 'Feinte');

INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 4','Exercise 4','Allez','Go','Faire', 'Lancer');

INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 5','Exercise 5','Allez','Go','Faire', 'Patin');

INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 6','Exercise 6','Allez','Go','Faire', '1vs1');

INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 7','Exercise 7','Allez','Go','Faire', 'Lancer');

INSERT INTO hpg.exercices (exercice_name_fr, exercice_name_eng, exercice_description_fr, exercice_descrription_eng, exercice_note, exercice_skills) 
VALUES ('Exercice 8','Exercise 9','Allez','Go','Faire', 'Patin');

COMMIT TRANSACTION;