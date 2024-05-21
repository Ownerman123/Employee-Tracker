const inquirer = require("inquirer");
const DB = require('./db/index');
const db = new DB;
let roles;
let employees;


async function loadNeededDataAndStart() {
    roles = await db.getRolesArray();
    newEmployeeQuestions[2].choices = roles;
    employees = await db.getEmployees();
    newEmployeeQuestions[4].choices = employees;
    StartAtMainMenu();
}

loadNeededDataAndStart();


const mainMenu = [
    {
        type: 'list',
        name: 'option',
        message: "What would you like to do?",
        choices: ['exit','view all departments','add employee',]
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

]

// assemble a main menu
function StartAtMainMenu(){

inquirer.prompt(mainMenu).then((response) => {

    let print;

    switch (response.option) {
        case 'exit':
            console.log('ok bye!');
            return 'done';
            
            break;
        case 'view all departments':
        print = db.viewAllDepartments();
        
        return print;
        
        break;
        case 'add employee':
            inquirer.prompt(newEmployeeQuestions)
            .then((data) => db.addEmployee(data.firstname, data.lastname, db.getRoleId(data.role), db.getManagerId(data.manager))).then(print = 'done')
        
        
        
        break;
        
    
        default:
            console.log('how bro?')
            break;
    }


    
}).then((data)=> {

    console.log(data);
    //if(data === 'done'){}else{StartAtMainMenu()}

});


}





//switch statement for user response

