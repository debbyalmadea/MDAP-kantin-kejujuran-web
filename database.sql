-- CREATE DATABASE kantin_kejujuran_db;

CREATE TABLE "user"(
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL UNIQUE, 
    password TEXT NOT NULL
);

CREATE TABLE item(
    id SERIAL PRIMARY KEY,
    created_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(45) NOT NULL,
    price INT NOT NULL,
    image TEXT NOT NULL,
    description VARCHAR(500) NOT NULL,
    sold BOOLEAN NOT NULL DEFAULT false,
    seller_id INT NOT NULL REFERENCES "user"(student_id) ON DELETE CASCADE,
    buyer_id INT REFERENCES "user"(student_id) ON DELETE CASCADE
);

CREATE TABLE balance_box(
    balance INT NOT NULL
);