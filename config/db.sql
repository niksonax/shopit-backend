CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE shopit;

-- UTILITY
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- USERS TABLE
CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role_id INTEGER NOT NULL DEFAULT '1'
);

INSERT INTO users (name, email, password) VALUES ('John','john@mail.com','12345');


-- PRODUCTS TABLE
CREATE TABLE products(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  user_id uuid
);

INSERT INTO products (name, description, price, user_id) VALUES ('Peashooter','How can a single plant grow and shoot somany peas so quickly? Peashooter says, "Hard work, commitment, and a healthy, well-balanced breakfast of sunlight and high-fiber carbon dioxide make it all possible."', 100, 'ac1e0283-0ba5-4fca-9964-24eb3cf80450');
INSERT INTO products (name, description, price, user_id) VALUES ('Sunflower', 'Sunflower can''t resist bouncing to the beat. Which beat is that? Why, the life-giving jazzy rhythm of the Earth itself, thumping at a frequency only Sunflower can hear.', 50, 'ac1e0283-0ba5-4fca-9964-24eb3cf80450');
INSERT INTO products (name, description, price, user_id) VALUES ('Melon-pult', 'There''s no false modesty with Melon-pult. "Sun-for-damage, I deliver the biggest punch on the lawn," he says. "I''m not bragging. Run the numbers. You''ll see."', 300, 'ac1e0283-0ba5-4fca-9964-24eb3cf80450');
INSERT INTO products (name, description, price, user_id) VALUES ('Cherry Bomb', '"I wanna explode," says Cherry #1. "No, let''s detonate instead!" says his brother, Cherry #2. After intense consultation they agree to explodonate.', 150, '6ec25453-944e-4925-89cd-456014045d85');
INSERT INTO products (name, description, price, user_id) VALUES ('Chomper', 'Chomper almost got a gig doing stunts for The Little Shop of Horrors but it fell through when his agent demanded too much on the front end. Chomper''s not resentful, though. He says it''s just part of the business.', 150, '6ec25453-944e-4925-89cd-456014045d85');
INSERT INTO products (name, description, price, user_id) VALUES ('Scaredy-shroom', '"Who''s there?" whispers Scaredy-shroom, voice barely audible. "Go away. I don''t want to see anybody. Unless it''s the man from the circus."', 25, '6ec25453-944e-4925-89cd-456014045d85');
INSERT INTO products (name, description, price, user_id) VALUES ('Squash', '"I''m ready!" yells Squash. "Let''s do it! Put me in! There''s nobody better! I''m your guy! C''mon! Whaddya waiting for? I need this!"', 50, 'a6288c0d-074b-491f-8d95-ba6fa72f94b6');
INSERT INTO products (name, description, price, user_id) VALUES ('Jalapeno', '"NNNNNGGGGG!!!!!!!!" Jalapeno says. He''s not going to explode, not this time. But soon. Oh, so soon. It''s close. He knows it, he can feel it, his whole life''s been leading up to this moment.', 125, 'a6288c0d-074b-491f-8d95-ba6fa72f94b6');


-- PURCHASES TABLE
CREATE TABLE purchases(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid,
  user_id uuid,
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON purchases
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO purchases (product_id, user_id, price) VALUES ('69ca37ce-bf66-4514-a696-14918521a223', 'ac1e0283-0ba5-4fca-9964-24eb3cf80450', '50');


-- SHOPIT WITH ROLES
CREATE TABLE roles(
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO roles (title) VALUES ('user');
INSERT INTO roles (title) VALUES ('manager');
INSERT INTO roles (title) VALUES ('admin');
