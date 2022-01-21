CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE shopit;

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

INSERT INTO users (name, email, password) VALUES ('John','john@mail.com','12345');

SELECT * FROM users;