-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users2;
DROP TABLE IF EXISTS todos;

CREATE TABLE users2 (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE todos(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR NOT NULL,
  task VARCHAR NOT NULL,
  complete BOOLEAN NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES users2(id)
  )