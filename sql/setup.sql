-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users2 CASCADE;
DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE users2 (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email  VARCHAR UNIQUE,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE todos(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  task VARCHAR NOT NULL,
  completed BOOLEAN NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users2(id)
  )