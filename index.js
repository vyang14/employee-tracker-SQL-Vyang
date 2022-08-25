const inquirer = require('inquirer');
const mysql = require('mysql2');

var allRoles = [];
var allEmp = [];
var allDepts = [];

const db = mysql.createConnection ({ // establishing credentials with mySql every time db is called
    host: 'localhost',
    user: 'root',
    password: 'SeeMeInKOF15',
    database: 'employees_db'
});

db.query('SELECT * FROM rolename;', function (err, data) {
    for(var i = 0; i < data.length; i++){
        allRoles.push(data[i].title);
    }  
})

db.query('SELECT * FROM employee;', function (err, data) {
    for(var i = 0; i < data.length; i++){
        let currentName = `${data[i].first_name} ${data[i].last_name}`;          
        allEmp.push(currentName);
    }

})

db.query('SELECT * FROM department;', function (err, data) {
    for(var i = 0; i < data.length; i++){
        allDepts.push(data[i].department_name);
    }
})

const questions =  { //array of objects containing all questions used for inquirer
    menu: [
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role']
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
            name: 'role',
            message: 'Select the new employee\'s role.',
            choices: allRoles,
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Select the new employee\'s manager.',
            choices: allEmp,
        },
        
    ],
    updateEmp: [
        {
            type: 'list',
            name: 'update',
            message: 'Please select which employee to update.',
            choices: allEmp,
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
            default: allRoles,
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Update this employee\'s manager.',
            default: allEmp,
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
            choices: allDepts,
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

function mainMenu() { //main menu function. Inquirer prompt with vast switch statement
    console.log(`=======================================
               Main Menu
=======================================`)
    inquirer.prompt(questions.menu).then((res) => {
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
                // getEmployees()
                // getRoles()
                // getDepts()
                addEmployee();
                break;
            case 'Add Role':
                // getRoles()
                // getDepts()
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Update Employee Role':
                // getEmployees()
                // getRoles()
                // getDepts()
                updateEmployee();
                break;
            }
        });
    };

function addEmployee(){ //function to add new employee
    inquirer.prompt(questions.newEmp).then((res) => {
        console.log(allEmp);
        console.log(allRoles);
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

function addRole(){ //function to add new role
    inquirer.prompt(questions.newRole).then((res) => {
        let deptID = res.department;
        let departmentAssign;
        db.query('SELECT * FROM department;', function (err, data) {
            for (var i = 0; i < data.length; i++){
                if (deptID == data[i].department_name) {
                    departmentAssign = parseInt(++i);
                }
            }
        })
        db.query('INSERT INTO rolename SET ?', { 
            title: res.title, 
            salary: res.salary,
            department_id: departmentAssign
        })
        allRoles.push(res.title); 
        console.log('Added successfully'),
        mainMenu()
    })
}

function addDepartment(){ //function to add new department
    inquirer.prompt(questions.newDept).then((res) => {
        db.query('INSERT INTO department SET ?', { 
            department_name: res.department,
        }) 
        allDepts.push(res.department); 
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


function viewEmployees() { //shows all employees
    console.log(`=======================================
    View All Employees
=======================================`)
        db.query('SELECT * FROM employee;', function (err, data) { // ID's, first, last, titles, deparment, salaries, manager
                console.table(data);
        })
        return mainMenu();
}

function viewRoles() { //shows all roles
    console.log(`=======================================
          View All Roles
=======================================`)
    db.query('SELECT * FROM rolename;', function (err, data) {
        console.table(data);
    })
    return mainMenu();
}

function viewDepts() { //shows all departments
    console.log(`=======================================
          View All Departments
=======================================`)
    db.query('SELECT * FROM department;', function (err, data) {
        console.table(data);
    })
    return mainMenu();
}

function assignManager(manager) { //assigns the employee id number as new hire's manager
    db.query('SELECT * FROM employee;', function (err, data) {
        console.log(data);
        for (i = 0; i < data.length; i++){
            let managerName = JSON.stringify(data[i].first_name + data[i].last_name);
                if (manager == managerName) {
                    console.log(data[i].id);
                    return data[i].id;
                }
            }
    })
}

function assignRole(role) { //assigns the role id number to the new entry
    db.query('SELECT * FROM rolename;', function (err, data) {
        for (var i = 0; i < data.length; i++){
            if (role == JSON.stringify(data[i].title)) {
                return data[i].id;
            }
        }
    })
}

function init() { //initializes the application
    console.log(`=======================================
 Employee Tracker SQL: by Vincent Yang
=======================================`);
    mainMenu();
}

init()