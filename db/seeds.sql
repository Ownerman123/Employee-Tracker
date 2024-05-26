INSERT INTO department(name)
VALUES
('Managment'),
('Kitchen'),
('Front_of_house');

INSERT INTO role (title, salary, department_id)
VALUES
('head_fry_cook', 70000, 2),
('manager', 100000, 1),
('cashier', 60000, 3),
('comic_relief', 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Eugene', 'Krabs',2, NULL ),
('Spongebob', 'Square-Pants',1,1),
('Garry', 'The Snail', 4, 2),
('Patrick', 'Star',4, NULL ),
('Sandy', 'Cheeks',4, NULL),
('Squidward', 'Tentacles',3, NULL)
