INSERT INTO department (department_name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO rolename (title, salary, department_id)
VALUES
    ('Lead Engineer', 200000, 1),
    ('Software Engineer', 100000, 1),
    ('Accountant', 90000, 2),
    ('Account Manager', 130000, 2),
    ('Legal Team Lead', 150000, 3),
    ('Lawyer', 180000, 3),
    ('Salesperson', 80000, 4),
    ('Sales Manager', 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Max', 'Eisenhardt', 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ororo', 'Munroe', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Henry', 'Pym', 3, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Elizabeth', 'Braddock', 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('James', 'Howlett', 5, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Robert', 'Banner', 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Anthony', 'Stark', 7, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Scott', 'Summers', 8, 7);