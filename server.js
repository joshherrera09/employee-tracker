// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

// Connection to mySql workbench
var connection = mysql.createConnection({
    host: "localhost",
    // PORT
    port: 8889,
    // Username
    user: "root",
    // Password
    password: "root",
    // Database
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
});

function init() {
    inquirer
        .prompt({
            message: "What would you like the employee tracker to help you with?",
            type: "list",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View Departments",
                "View Roles",
                "View employees",
                "I'm done"
            ],
            name: "todo"
        }).then(function(res) {
            switch (res.todo) {
                case "Add department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;
                
                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                case "I'm done":
                    connection.end();
                    break;

            }
        })
}

function addDepartment() {
    inquirer
        .prompt({
                type: "input",
                message: "What department would you like to add?",
                name: "add-department"
            }).then(function(res) {
                connection.query(
                    'INSERT INTO department (name) VALUES (?)', 
                    [res.name], function(err, res) {
                        if (err) throw err;
                        console.log("Department added");
                        init();
                })
            })
}

function addRole() {
    inquirer
        .prompt([
            {
            type: "input",
            message: "Enter the title of the role",
            name: "title"
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                titel: "salary"
            },
            {
                type: "list",
                message: "What is the department ID?",
                name: "dep_id"
            }
        ]).then(function(res) {
            connection.query("INSERT INTO role (title, salary, dep_id), VALUES (?, ?, ?)", [res.title, res.salary, res.dep_id], 
            function(err, data) {
                console.table(data);
            })
            init();
        })
}