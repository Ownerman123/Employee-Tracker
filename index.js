const inquirer = require("inquirer");
const DB = require('./db/index');
const db = new DB;
let roles;
let employees;
let departments


async function loadNeededDataAndStart() {
    roles = await db.getRolesArray();
    newEmployeeQuestions[2].choices = roles;
    updateEmployeeQuestions[1].choices = roles;
    employees = await db.getEmployees();
    newEmployeeQuestions[4].choices = employees;
    updateEmployeeQuestions[0].choices = employees;
    updateEmployeeQuestions[3].choices = employees;
    departments = await db.getDepartmentsArray();
    newRoleQuestions[2].choices = departments
    StartAtMainMenu();
}

loadNeededDataAndStart();


const mainMenu = [
    {
        type: 'list',
        name: 'option',
        message: "What would you like to do?",
        choices: ['exit','view all departments','view all roles','view all employees','add employee','add role','add department','update employee']
    }
];
const newEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstname',
        message:'what is the employees first name?'
    },
    {
        type: 'input',
        name: 'lastname',
        message:'what is the employees last name?'
    },
    {
        type: 'list',
        name: 'role',
        message:'what role does the employee fill?',
        choices: roles
    },
    {
        type: 'confirm',
        name: 'hasmanager',
        message:'does the employee have a manager?',
        default: false
    },
    {
        type: 'list',
        name: 'manager',
        message:'Who is their manager?',
        when(answers){return answers.hasmanager === true},
        choices: employees

    },

];
const newRoleQuestions = [
    {
        type: 'input',
        name: 'title',
        message:'what is the title of the new role?'
    },
    {
        type: 'input',
        name: 'salary',
        message:'what is the salary for the new role?'
    },
    {
        type: 'list',
        name: 'department',
        message:'what department does the role belong to?',
        choices: departments
    },
    

];
const newDepartmentQuestions = [
    {
        type: 'input',
        name: 'name',
        message:'what is the title of the new Department?'
    },
    
    

];
const updateEmployeeQuestions = [
    {
        type: 'list',
        name: 'firstname',
        message:'Which employee do you wish to update?',
        choices: employees
    },
    {
        type: 'list',
        name: 'role',
        message:'What role does the employee fill now?',
        choices: roles
    },
    {
        type: 'confirm',
        name: 'hasmanager',
        message:'Do you wish to change the employees manager?',
        default: false
    },
    {
        type: 'list',
        name: 'manager',
        message:'Who is their manager?',
        when(answers){return answers.hasmanager === true},
        choices: employees

    },

];

function waitForInputThenStart() {
    inquirer.prompt([{type: 'confirm', name: 'confirm', message: 'continue?', default: false}]).then((data) => {if(data.confirm){return loadNeededDataAndStart()}else{ return endApp()}})
}
function endApp() {
    console.log('ok Bye!');
    process.exit();
}
// assemble a main menu
function StartAtMainMenu(){

inquirer.prompt(mainMenu).then((response) => {



    switch (response.option) {
        case 'exit':
            
            return 'done';
            
            break;
        case 'view all departments':
            
        db.viewAllDepartments();
       
        return 'done';
        
        break;
        case 'view all roles':
            
            db.viewAllRoles();
            console.log('\n');

            return 'done'
            
            
            
            break;
        case 'view all employees':
            
            db.viewAllEmployees();
            return 'done'
            
            
            
            break;
            
            case 'add employee':
             return   inquirer.prompt(newEmployeeQuestions)
                .then((data) => {
                   
                     return data;
                    
        }).then((data) => {
        db.addEmployee(data.firstname, data.lastname, data.role, data.manager);}).then(() => {return 'done';});
            
     
            break;

            case 'add role':
               return inquirer.prompt(newRoleQuestions)
                .then((data) => {
                  
                     return data;
                    
        }).then((data) => {
        db.addRole(data.title, data.salary, data.department);}).then(() => {return 'done';});
            
            break;

            case 'add department':
              return  inquirer.prompt(newDepartmentQuestions)
                .then((data) => {
                  
                     return data;
                    
        }).then((data) => {
        db.addDepartment(data.name);}).then(() => {return 'done';});
            
            break;
            case 'update employee':
              return  inquirer.prompt(updateEmployeeQuestions)
                .then((data) => {
                  
                     return data;
                    
        }).then((data) => {
        db.updateEmployee(data.firstname, data.role, data.manager);}).then(() => {return 'done';});
            
            break;
    
        default:
            console.log('how bro?')
            break;
    }


    
}).then((data)=> {
    
    if(data){waitForInputThenStart()};
    

});


}






