var mysql = require("mysql");
var inquirer = require('inquirer');
const cTable = require('console.table');


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employeeTracker_DB"
    // REMEBER TO ADD DATABASE HERE TO REFERENCE!!!!!!
});

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
        ])

    console.log("Inserting a new department...\n");
    var query = connection.query()
    // ??????????????????????????


    // logs the actual query being run
    console.log(query.sql);
}

function addRoles() {
    inquirer
        .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What role would you like to add?"
            },
            {
                name: "roleSalary",
                type: "number",
                message: "What is the salary for this role?"
            },
            {
                name: "roleDept",
                type: "input",
                message: "What is the department for this role?"
            }

        ])


    console.log("Inserting a new role...\n");
    var query = connection.query()
    // ??????????????????????????



    // logs the actual query being run
    console.log(query.sql);
}


function addEmployees() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "employeesRole",
                type: "input",
                message: "What is the employee's role?"
            },
            {
                name: "employeesMgr",
                type: "input",
                message: "Who is the employee's manager"
            }

        ])


    console.log("Inserting a new role...\n");
    var query = connection.query()
    // ??????????????????????????



    // logs the actual query being run
    console.log(query.sql);
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
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        start();
        //   connection.end();
    });
}

function viewEmployees() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
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
    inquirer
        .prompt([
            {
                name: "updateRole",
                type: "input",
                message: "What role do you want to update?"
            }

        ]);

    // logs the actual query being run
    console.log(query.sql);
}