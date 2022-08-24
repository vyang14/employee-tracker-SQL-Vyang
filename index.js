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
            name: 'landing',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Employees', 'Add Role','View All Departments','Add Department']
        }
    ],
    newEmp: [
        {
            type: 'input',
            name: 'landing',
            message: 'Please enter the new employee\'s first name.',
        },
        {
            type: 'input',
            name: 'landing',
            message: 'Please enter the new employee\'s last name.',
        },
        {
            type: 'list',
            name: 'landing',
            message: 'Select the new employee\'s role.',
            choices: ['choice 1']
        },
        {
            type: 'list',
            name: 'landing',
            message: 'Select the new employee\'s manager.',
            choices: ['choice 1']
        }
    ],
    updateEmp: [
        {
            type: 'list',
            name: 'landing',
            message: 'Please select which employee to update.',
            choices: ['choice 1']
        }
    ],
    newRole: [
        {
            type: 'input',
            name: 'landing',
            message: 'Enter the name of the role that you would like to add.',
        },
        {
            type: 'input',
            name: 'landing',
            message: 'Enter the salary for this role.',
        },
        {
            type: 'list',
            name: 'landing',
            message: 'Choose the department this role belongs to.',
            choices: ['choice 1']
        }
    ],
    newDept: [
        {
            type: 'input',
            name: 'landing',
            message: 'Enter the name of the department that you would like to add.',
        },
    ]
}

function mainMenu() {
    inquirer.prompt(questions.menu).then((res) => {
        switch(res){
            case 'View All Employees':
                db.query('SELECT department.id, department.department_name AS "department", roleName.salary FROM rolename JOIN department ON department_name.department_id = department.id ORDER BY jobrole.id ASC'), function (err, data){
                    console.table(data)
                    return mainMenu();
                }
            case 'Add Employee':
                {
                    return mainMenu();
                }
            case 'Update Employee Role':
                {
                    return mainMenu();
                }
            case 'View All Employees':
                {
                    return mainMenu();
                }
            case 'Add Role':
                {
                    return mainMenu();
                }
            case 'View All Departments':
                {
                    return mainMenu();
                }
            case 'Add Department': 
            {
                return mainMenu();
            }
        }
    });
};

function addEmployee(){
    inquirer.prompt(questions.newEmp).then((res) => {
        
    })
}

function updateEmployee(){
    inquirer.prompt(questions.newEmp)
}

function addRole(){

}

function addDepartment(){

}

function init() {
    console.log(`=======================================
 Employee Tracker SQL: by Vincent Yang
=======================================`);
    mainMenu()
}

init()