USE employeeTracker_DB;

INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Sales");

INSERT INTO role (title, salary, department_id) VALUES ("Boss", 23, 1);
INSERT INTO role SET title = "Sales Boss", salary = 23, department_id = 2;

-- foreign key
-- constraint

INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sales", "Johnson", 1, 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("John", "Johnson", 1);