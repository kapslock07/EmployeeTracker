var mysql = require("mysql");
var inquirer = require('inquirer');
const cTable = require('console.table');
const dotenv = require('dotenv').config()


var connection = mysql.createConnection({
    host: process.env.DB_HOST,

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: process.env.DB_USER,

    // Your password
    password: process.env.DB_PASS,
    database: "employeeTracker_DB"
});

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS)
// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add departments, roles, employees",
                "View departments, roles, employees",
                "Update employee roles"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add departments, roles, employees":
                    addSomething();
                    break;

                case "View departments, roles, employees":
                    viewSomething();
                    break;

                case "Update employee roles":
                    updateRole();
                    break;
            }
        });
}
// ----------------------------------------------
// ADD THE ADDSOMETHING FUNCTION HERE!!!!!
function addSomething() {

    inquirer
        .prompt({
            name: "add",
            type: "rawlist",
            message: "What would you like to add?",
            choices: [
                "Departments",
                "Roles",
                "Employees"
            ]
        })
        .then(function (answer) {
            switch (answer.add) {
                case "Departments":
                    addDepts();
                    break;

                case "Roles":
                    addRoles();
                    break;

                case "Employees":
                    addEmployees();
                    break;
            }
        });
}

function addDepts() {
    inquirer
        .prompt([
            {
                name: "deptName",
                type: "input",
                message: "What department would you like to add?"
            }
        ]).then(function (answers) {

            console.log("Inserting a new department...\n");
            var query = connection.query("INSERT INTO department SET ?",
                {
                    name: answers.deptName
                },
                function (err, res) {
                    if (err) throw err;
                    start();
                    //   connection.end();
                })

        })

}

function addRoles() {

    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        //res.map(function)
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What role would you like to add?"
                },
                {
                    name: "salary",
                    type: "number",
                    message: "What is the salary for this role?"
                },
                {
                    name: "department_id",
                    type: "input",
                    message: "What is the department id for this role?"
                },
                // {
                //     name: "department_id",
                //     type: "list",
                //     message: "What is the department for this role?",
                //     choices: [{name: "sales", value: 1}]
                // }

            ]).then(function (answers) {

                console.log("Inserting a new role...\n");
                var query = connection.query("INSERT INTO role SET ?",
                    answers,
                    function (err, res) {
                        if (err) throw err;
                        start();
                        //   connection.end();
                    })

            })
    });
}


function addEmployees() {

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);


        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);


            //res.map(function)
            inquirer
                .prompt([
                    {
                        name: "first_name",
                        type: "input",
                        message: "What is the employee's first name?"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "What is the employee's last name?"
                    },
                    {
                        name: "role_id",
                        type: "input",
                        message: "What is the employee's role id?"
                    },
                    {
                        name: "manager_id",
                        type: "input",
                        message: "What is the employee id of their manager?"
                    }

                ]).then(function (answers) {


                    console.log("Inserting a new employee...\n");
                    var query = connection.query("INSERT INTO employee SET ?",
                        answers,
                        function (err, res) {
                            if (err) throw err;
                            start();
                            //   connection.end();
                        })
                })
        });
    });
}
// --------------------------------------------

function viewSomething() {
    inquirer
        .prompt({
            name: "view",
            type: "rawlist",
            message: "What would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees"
            ]
        })
        .then(function (answer) {
            switch (answer.view) {
                case "Departments":
                    viewDepts();
                    break;

                case "Roles":
                    viewRoles();
                    break;

                case "Employees":
                    viewEmployees();
                    break;
            }
        });
}

function viewDepts() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
        //   connection.end();
    });
}

function viewRoles() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
        //   connection.end();
    });
}

function viewEmployees() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, \" \", manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
        //   connection.end();
    });
}
// -------------------------------------------------
// ADD THE UPDATEROLE FUNCTION HERE!!!!!!

function updateRole() {

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        //res.map(function)
        inquirer
            .prompt([
                {
                    name: "chooseRoleField",
                    type: "rawlist",
                    message: "Would you like to update the title or salary?",
                    choices: [
                        "title",
                        "salary"
                    ]
                }

            ]).then(function (answer) {
                switch (answer.view) {
                    case "title":
                        updateTitle();
                        break;

                    case "salary":
                        updateSalary();
                        break;
                }
            })
            .then(
                function updateTitle(answers) {
                    inquirer
                        .prompt([
                            {
                                name: "chooseRoleID",
                                type: "input",
                                message: "What is the id of the role you want to update?",
                            },
                            {
                                name: "updateTitle",
                                type: "input",
                                message: "What should the new title be?"
                            }
                        ]).then(function (answers) {
                            var query = connection.query(
                                "UPDATE role SET ? WHERE ?",
                                [
                                    {
                                        title: answers.updateTitle
                                    },
                                    {
                                        id: answers.chooseRoleID
                                    }
                                ],

                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + " products updated!\n");
                                    start();
                                }
                            );

                        })
                })
        function updateSalary(answers) {
            inquirer
                .prompt([
                    {
                        name: "chooseRoleID",
                        type: "input",
                        message: "What is the id of the role you want to update?",
                    },
                    {
                        name: "updateSalary",
                        type: "number",
                        message: "What should the new salary be?"
                    }
                ]).then(function (answers) {
                    var query = connection.query(
                        "UPDATE role SET ? WHERE ?",
                        [
                            {
                                salary: answers.updateSalary
                            },
                            {
                                id: answers.chooseRoleID
                            }
                        ],

                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " products updated!\n");
                            start();
                        }
                    );

                });

        }
    });

}