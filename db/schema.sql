DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE deparment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    departmentName VARCHAR(30) NOT NULL
);

CREATE TABLE roleName (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    deparment_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES deparment(id) ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roleName(id)
    ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);