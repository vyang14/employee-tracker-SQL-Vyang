const inquirer = require('inquirer');
const mysql = require('mysql2');
// const {  } = require('./helpers/utils')
var allRoles = [];
var allEmp = [];
var allDepts = [];

var newEmployee = {
    first_name: '',
    last_name: '',
    role_id: 0,
    manager_id: 0
}


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'SeeMeInKOF15',
    database: 'employees_db'
});

const questions =  {
    menu: [
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'Done Editing']
        }
    ],
    newEmp: [
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter the new employee\'s first name.',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter the new employee\'s last name.',
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the new employee\'s role.',
            choices: getRoles()
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the new employee\'s manager.',
            choices: getEmployees()
        }
    ],
    updateEmp: [
        {
            type: 'list',
            name: 'update',
            message: 'Please select which employee to update.',
            choices: ['choice 1']
        }
    ],
    newRole: [
        {
            type: 'input',
            name: 'role',
            message: 'Enter the name of the role that you would like to add.',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role.',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Choose the department this role belongs to.',
            choices: ['choice 1']
        }
    ],
    newDept: [
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department that you would like to add.',
        },
    ]
}

function mainMenu() {
    console.log(`=======================================
               Main Menu
=======================================`)
    inquirer.prompt(questions.menu).then((res) => {
        console.log(res.menu);
        switch(res.menu){
            case 'View All Employees':
                viewEmployees();
                break;
            case 'View All Departments':
                viewDepts();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Employee':
                return addEmployee();
            case 'Add Department':
                db.query('SELECT department.id, department.department_name AS "department", roleName.salary FROM rolename JOIN department ON department_name.department_id = department.id ORDER BY jobrole.id ASC', function (err, data){
                    console.table(data)
                })
                return mainMenu();
            case 'Update Employee Role':
                    return mainMenu();
            case 'Done Editing':
                return mainMenu();
            }

        });
    };


// db.query('SELECT department.id, department.department_name AS "department", roleName.salary FROM rolename JOIN department ON department_name.department_id = department.id ORDER BY jobrole.id ASC', function (err, data){
//     console.table(data)
function addEmployee(){
    inquirer.prompt(questions.newEmp).then((res) => {
        // var dbData = [];
        // db.query('SELECT * FROM employee;', function (err, data) {
        //     dbData = JSON.stringify(data);            
        // })
        console.log(res.role);
        console.log(res.manager);

        let newRole = assignRole(res.role);
        let newManager = assignManager(res.manager);

        console.log(newRole);
        console.log(newManager); 

        var newEmployee = {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: newRole,
            manager_id: newManager
        }
        
        console.log(newEmployee);
    
    }).then((res) => {
        
    })


}

// function updateEmployee(){
//     inquirer.prompt(questions.newEmp)
// }

// function addRole(){

// }

// function addDepartment(){

// }

function viewEmployees() {
    console.log(`=======================================
    View All Employees
=======================================`)
        db.query('SELECT * FROM employee;', function (err, data) {
                console.table(data);
        })
        return mainMenu();
}

function viewRoles() {
    console.log(`=======================================
          View All Roles
=======================================`)
    db.query('SELECT * FROM rolename;', function (err, data) {
        console.table(data);
    })
    return mainMenu();
}

function viewDepts() {
    console.log(`=======================================
          View All Departments
=======================================`)
    db.query('SELECT * FROM department;', function (err, data) {
        console.table(data);
    })
    return mainMenu();
}

function assignManager(manager) {
    console.log(manager);
    var dbData = [];
    
    db.query('SELECT * FROM employee;', function (err, data) {
        dbData = data;

        for (i = 0; i < data.length; i++){
            let managerName = data[i].first_name + data[i].last_name;
                if (manager = managerName) {
                    console.log(data[i]);
                    console.log(`data[i].id = ${data[i].id}`);
                    return data[i].id;
                }
            }
    })
    
}

function assignRole(role) {
    console.log(role);
    db.query('SELECT * FROM rolename;', function (err, data) {

        for (i = 0; i < data.length; i++){
            if (role = data[i].title) {
                console.log(data[i]);
                console.log(`data[i].id = ${data[i].id}`);
                return data[i].id;
            }
        }
    })
}

function getRoles() {
    allRoles = [];
    db.query('SELECT * FROM rolename;', function (err, data) {
        for(i = 0; i < data.length; i++){
            allRoles.push(data[i].title);
        }
    })
    return allRoles;
}

function getEmployees() {
    allEmp = [];
    db.query('SELECT * FROM employee;', function (err, data) {
        for(i = 0; i < data.length; i++){
            allEmp.push(`${data[i].first_name} ${data[i].last_name}`);
        }
    })
    return allEmp;
}

function getDepts() {
    allDepts = [];
    db.query('SELECT * FROM department;', function (err, data) {
        for(i = 0; i < data.length; i++){
            allDepts.push(data[i].department_name);
        }
    })
    return allDepts;
}


function init() {
    console.log(`=======================================
 Employee Tracker SQL: by Vincent Yang
=======================================`);
    mainMenu()
}

init()