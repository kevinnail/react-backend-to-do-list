-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users2 CASCADE;
DROP TABLE IF EXISTS todos5 CASCADE;

CREATE TABLE users2 (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email  VARCHAR UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE todos5(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  task VARCHAR NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 'false', 
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
  -- FOREIGN KEY (user_id) REFERENCES users2(id)
  );


INSERT INTO todos5 (user_id, task, completed)
VALUES
('1','Mow lawn', 'false'),
('1','Clean kitchen', 'false'),
('1','Wash car', 'true'),
('2','Do sit ups', 'false'),
('2','Pain the house', 'false'),
('3','Get groceries', 'true');









