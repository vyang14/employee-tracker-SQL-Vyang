INSERT INTO department (deparmentName)
VALUES (Engineering),
       (Finance),
       (Legal),
       (Sales);

INSERT INTO roleName (title, salary, department_id)
VALUES  ("Lead Engineer", 200000, 1),
        ("Software Engineer", 100000, 1),
        ("Accountant", 90000, 2),
        ("Account Manager", 130000, 2),
        ("Legal Team Lead", 150000, 3),
        ("Lawyer", 180000, 3),
        ("Salesperson", 80000, 4),
        ("Sales Manager", 110000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Max", "Eisenhardt", 1),
       ("Ororo", "Munroe", 1, 1),
       ("Henry", "Pym", 2, 4),
       ("Elizabeth", "Braddock", 2, 1),
       ("James", "Howlett", 3),
       ("Robert", "Banner", 3, 5),
       ("Scott", "Summers", 4, 8),
       ("Anthony", "Stark", 4, 4);
