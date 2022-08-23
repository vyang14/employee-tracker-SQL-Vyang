const inquirer = require('inquirer');
const mysql = require('mysq12');
const { debug } = require('console');

const menu =
        {
            type: 'list',
            name: 'landing',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Employees', ' Add Role','View All Departments','Add Department']
        }

function mainMenu() {
    inquirer.createPromptModule(menu).then(res => {
        switch(res){
            case 'View All Employees':
                db.query('SELECT department.id, department.departmentName AS "department", roleName.salary FROM roleName JOIN department ON departmentName.department_id = department.id ORDER BY jobrole.id ASC'), function (err, data){
                    console.table(data)
                    return mainMenu();
                }
            case 'Add Employee':
                return mainMenu();
            case 'Update Employee Role':
                return mainMenu();
            case 'View All Employees':
                return mainMenu();
            case 'Add Role':
                return mainMenu();
            case 'View All Departments':
                return mainMenu();
            case 'Add Department': 
                return mainMenu();
        }
    });
};

function init() {
    console.log('Employee Tracker SQL: by Vincent Yang');
    mainMenu()
}

init()