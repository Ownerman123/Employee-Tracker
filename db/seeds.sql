INSERT INTO department(name)
VALUES
('Managment'),
('Kitchen'),
('Front of house');

INSERT INTO role (title, salary, department_id)
VALUES
('Head Fry Cook', 70000, 2),
('Manager', 100000, 1),
('Cashier', 60000, 3),
('Comic_Relief', 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Eugene', 'Krabs',2, NULL ),
('Spongebob', 'Square-Pants',1,1),
('Garry', 'The Snail', 4, 2),
('Patrick', 'Star',4, NULL ),
('Sandy', 'Cheeks',4, NULL),
('Squidward', 'Tentacles',3, NULL)
