USE employeeTracker_DB;

INSERT INTO department (name) VALUES ("Executive");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");


INSERT INTO role SET title = "CEO", salary = 200000, department_id = 1;
INSERT INTO role SET title = "Sales Director", salary = 100000, department_id = 2;
INSERT INTO role SET title = "CFO", salary = 130000, department_id = 3;
INSERT INTO role SET title = "Vice President", salary = 150000, department_id = 1;
INSERT INTO role SET title = "Sales Specialist", salary = 60000, department_id = 2;
INSERT INTO role SET title = "Financial Analyst", salary = 80000, department_id = 3;


INSERT INTO employee (first_name, last_name, role_id) VALUES ("Bob", "Thompson", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("James", "Williams", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Allison", "Green", 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Smith", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Susan", "Jones", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tim", "Martin", 6, 3);


-- foreign key
-- constraint