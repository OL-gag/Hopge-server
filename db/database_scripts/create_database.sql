-- CREATE ROLE, GRANT,  DATABASE --
-- CREATE ROLE hk WITH LOGIN PASSWORD 'hockey'; -- set as Super USER
-- CREATE DATABASE hopge;   -- set as hk as Owner.

BEGIN TRANSACTION;

CREATE SCHEMA IF NOT EXISTS hpg;

-- CREATE TABLES ---
DROP TABLE IF EXISTS hpg.users, hpg.drills, hpg.practiceInfo, hpg.practiceDetails  CASCADE;

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
	duration smallint NULL,
	fullIce boolean,
	startDtm TIMESTAMP, 
	endDtm TIMESTAMP, 
	creationDtm TIMESTAMP,
	skills VARCHAR(150)
	user_id SERIAL REFERENCES hpg.users(user_id)
);

CREATE TABLE IF NOT EXISTS hpg.drills
(
	drill_id SERIAL PRIMARY KEY,
	drill_name_fr varchar(75),
	drill_name_eng varchar(75),
	drill_description_fr varchar(2000),
	drill_description_eng varchar(2000),
	drill_note varchar(2000),
	drill_picture BYTEA,
	drill_skills varchar(200),
	drill_full_ice boolean,
	drill_version varchar(10)
);

CREATE TABLE IF NOT EXISTS hpg.practiceDetails (
	practice_det_id SERIAL PRIMARY KEY,
	practice_id SERIAL REFERENCES hpg.practiceInfo(practice_id),
	drill_id SERIAL REFERENCES hpg.drills(drill_id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA hpg TO hk;

/* for test */
INSERT INTO hpg.users (first_name, last_name) VALUES ('Generic User','Gen');


INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 1','Drill 1','Allez','Go','Faire', 'Patin');

INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 2','Drill 2','Allez','Go','Faire', 'Lancer');

INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 3','Drill 3','Allez','Go','Faire', 'Feinte');

INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 4','Drill 4','Allez','Go','Faire', 'Lancer');

INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 5','Drill 5','Allez','Go','Faire', 'Patin');

INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 6','Drill 6','Allez','Go','Faire', '1vs1');

INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 7','Drill 7','Allez','Go','Faire', 'Lancer');

INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_descrription_eng, drill_note, drill_skills) 
VALUES ('Exercice 8','Exercise 9','Allez','Go','Faire', 'Patin');

COMMIT TRANSACTION;