DROP DATABASE IF EXISTS Employee_db
CREATE DATABASE Employee_db
\c Employee_db

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFRENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id  SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    
)