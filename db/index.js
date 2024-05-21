const pool = require('./connection');

class DB {
    constructor() {}

    async query(sql , args = []) {

        const client = await pool.connect();
        try{
            const result =  (await client.query(sql, args)).rows;
            return result;
        }finally{
            client.release();
        }
    }

    async getRolesArray() {
        const rolesobj =  await this.query('SELECT title FROM role');
        
        let roles = [];

        for(let i = 0; i < rolesobj.length; i++){
            roles.push(rolesobj[i].title)
        }
        console.log(roles);
        return roles;
    }

    async getEmployees(){
       const employeesobj = await this.query(`SELECT first_name, last_name FROM employee` );
       let employees = [];

        for(let i = 0; i < employeesobj.length; i++){
            employees.push(employeesobj[i].first_name.concat(" " + employeesobj[i].last_name))
        }
        return employees;
    }

    getRoleId(rolename){
        const id = this.query(`SELECT id FROM role where title=${rolename}` );
        return id.id;
    }
    getManagerId(managername){
        if(!managername){return null}else{
            const id = this.query(`SELECT id FROM employee where first_name=${managername}` );
            return id.id;
        }
    }
    //functions for all the data requests
    
    findAllEmployees() {
        return this.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department'
        );
    }

    viewAllDepartments() {
        return this.query('SELECT id, name AS Department FROM department');
    }
    addEmployee(firstname, lastname, role, manager){
        this.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${firstname}, ${lastname}, ${role}, ${manager})`);
        return console.log("added");
    }

}
module.exports = DB;


