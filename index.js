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
        },
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
            name: 'manager',
            message: 'Select the new employee\'s manager.',
            choices: getEmployees(),
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select the new employee\'s role.',
            choices: getRoles(),
        },
        
    ],
    updateEmp: [
        {
            type: 'list',
            name: 'update',
            message: 'Please select which employee to update.',
            choices: getEmployees(),
        },
    ],
    updatedEmp: [
        {
            type: 'input',
            name: 'firstName',
            message: 'Update this employee\'s first name.',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Update this employee\'s last name.',
        },
        {
            type: 'list',
            name: 'role',
            message: 'Update this employee\'s role.',
            default: getRoles(),
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Update this employee\'s manager.',
            default: getEmployees(),
        }
    ],
    newRole: [
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role that you would like to add.',
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
            choices: getDepts(),
        },
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
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            }

        });
    };



function addEmployee(){
    inquirer.prompt(questions.newEmp).then((res) => {

        let newRole = assignRole(res.role);
        let newManager = assignManager(res.manager);

        db.query('INSERT INTO employee SET ?', { 
            first_name: res.firstName, 
            last_name: res.lastName,
            role_id: newRole,
            manager_id: newManager
        }) 
        console.log('Added successfully'),
        mainMenu()
    })

}

function addRole(){
    inquirer.prompt(questions.newRole).then((res) => {
        console.log(res);
        let deptID = res.department;
        let departmentAssign;
        db.query('SELECT * FROM department;', function (err, data) {
            console.log(data);
            for (var i = 0; i < data.length; i++){
                if (deptID == data[i].department_name) {
                    console.log(`dept == ${deptID} == ${data[i].department_name}`)
                    departmentAssign = parseInt(++i);
                }
            }
            console.log(departmentAssign);
            console.log(`title: ${res.title}, 
                salary: ${res.salary},
                department_id: ${departmentAssign}`)
        })
        db.query('INSERT INTO rolename SET ?', { 
            title: res.title, 
            salary: res.salary,
            department_id: departmentAssign
        }) 
        console.log('Added successfully'),
        mainMenu()
    })
}

function addDepartment(){
    getDepts()
    inquirer.prompt(questions.newDept).then((res) => {
        db.query('INSERT INTO department SET ?', { 
            department_name: res.department,
        }) 
        console.log('Added successfully'),
        mainMenu()
    })
}

function updateEmployee(){
    inquirer.prompt(questions.updateEmp).then((res) => {
        inquirer.prompt(questions.updatedEmp).then((res) => {

        })
    })
}


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
            let managerName = JSON.stringify(data[i].first_name + data[i].last_name);
                if (manager == managerName) {
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
        console.log(data);
        for (var i = 0; i < data.length; i++){
            if (role == JSON.stringify(data[i].title)) {
                
                console.log(`data[i].id = ${data[i].id}`);
                return data[i].id;
            }
        }
    })
}

function getRoles() {
    allRoles = [];
    db.query('SELECT * FROM rolename;', function (err, data) {
        for(var i = 0; i < data.length; i++){
            console.log(data[i].title);
            allRoles.push(data[i].title);
        }
    })
    console.log(allRoles);
    return allRoles;
}

function getEmployees() {
    allEmp = [];
    db.query('SELECT * FROM employee;', function (err, data) {
        for(var i = 0; i < data.length; i++){
            let currentName = `${data[i].first_name} ${data[i].last_name}`;          
            allEmp.push(currentName);
        }
    })
    console.log(allEmp);
    return allEmp;
}

function getDepts() {
    allDepts = [];
    db.query('SELECT * FROM department;', function (err, data) {
        for(var i = 0; i < data.length; i++){
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