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
VALUES ("Sleve", "McDichael", 1),
       ("Onson", "Sweemey", 1, 1),
       ("Glendalee", "Smorin", 2),
       ("Raul", "Chamgerlain", 2),
       ("Todd", "Smehrik", 3),
       ("Bobson", "Dugnutt", 3, 3),
       ("Mike", "Truk", 4, 4),
       ("Kim", "Sandaele", 4, 4);
