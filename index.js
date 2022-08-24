const inquirer = require('inquirer');
const mysql = require('mysql2');
const { debug } = require('console');

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
            choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role']
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
            choices: ['choice 1']
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the new employee\'s manager.',
            choices: ['choice 1']
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
    inquirer.prompt(questions.menu).then((res) => {
        switch(res.menu){
            case 'View All Employees':
                db.query('SELECT * FROM employee;', function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.table(data);
                    }
                    return mainMenu();
                })
            case 'View All Departments':
                db.query('SELECT department.id, department.department_name AS "department", roleName.salary FROM rolename JOIN department ON department_name.department_id = department.id ORDER BY jobrole.id ASC', function (err, data){
                    console.table(data)
                    return mainMenu();
                })
            case 'View All Roles':
                    return mainMenu();
            // case 'Add Employee':
            //         return mainMenu();
            // case 'Add Role':
            //         return mainMenu();
            // case 'Add Department':
            //         return mainMenu();
            // case 'Update Employee Role': 
            //         return mainMenu();
        }
    });
};

// function addEmployee(){
//     inquirer.prompt(questions.newEmp).then((res) => {
        
//     })
// }

// function updateEmployee(){
//     inquirer.prompt(questions.newEmp)
// }

// function addRole(){

// }

// function addDepartment(){

// }

function init() {
    console.log(`=======================================
 Employee Tracker SQL: by Vincent Yang
=======================================`);
    mainMenu()
}

init()