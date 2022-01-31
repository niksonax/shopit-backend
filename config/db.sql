CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE shopit;

-- USERS TABLE
CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
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