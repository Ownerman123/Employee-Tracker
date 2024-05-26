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
        
        return roles;
    }
    async getDepartmentsArray() {
        const departmentsobj =  await this.query('SELECT name FROM department');
        
        let departments = [];

        for(let i = 0; i < departmentsobj.length; i++){
            departments.push(departmentsobj[i].name)
        }
        
        return departments;
    }


    async getEmployees(){
       const employeesobj = await this.query(`SELECT first_name, last_name FROM employee;` );
       let employees = [];

        for(let i = 0; i < employeesobj.length; i++){
            employees.push(employeesobj[i].first_name)
        }
        return employees;
    }

   async getRoleId(rolename){
    
   
        const id = await this.query(`SELECT id FROM role WHERE title = '${rolename}';` );
       
        return id[0].id;
    }
    async getdepartmentId(departmentname){
        
       
            const id = await this.query(`SELECT id FROM department WHERE name = '${departmentname}';` );
           
            return id[0].id;
        }
    async getManagerId(managername){
        if(!managername){return null}else{
            const id = await this.query(`SELECT id FROM employee where first_name = '${managername}';` );
            console.log('manager id is ', id[0].id);
            return id[0].id;
        }
    }
    //functions for all the data requests
    
    findAllEmployees() {
        return this.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department;'
        );
    }

    async viewAllDepartments() {
        const allDepts = await this.query('SELECT id, name AS Department FROM department;');
        console.log('\n');
        console.table(allDepts);
        return allDepts;
    }
    async viewAllRoles() {
        const allRoles = await this.query('SELECT role.id, role.title AS Job_Title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;');
        console.log('\n');
        console.table(allRoles);
        return allRoles;
    }
    async viewAllEmployees() {
        const allEmployees = await this.query('SELECT e1.id, e1.first_name AS First_Name, e1.last_name AS Last_Name, role.title AS Job_Title, role.salary AS Salary, e2.first_name AS Manager, department.name AS Department FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e1.manager_id = e2.id;');
        console.log('\n');
        console.table(allEmployees);
        return allEmployees;
    }
    
    
    async addEmployee(firstname, lastname, role, manager){
       const  roleid = await this.getRoleId(role);
        const managerid = await this.getManagerId(manager);
        try{
        await this.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstname}', '${lastname}', ${roleid}, ${managerid});`);
        return console.log("added");
        } catch (err) {
            console.log(err);
        }
    }

    async addRole(title, salary, department){
        const  departmentid = await this.getdepartmentId(department);
         
         try{
         await this.query(`INSERT INTO role(title, salary, department_id) VALUES ('${title}', '${salary}', ${departmentid});`);
         return console.log("added");
         } catch (err) {
             console.log(err);
         }
     }
     async addDepartment(name){
        
         
         try{
         await this.query(`INSERT INTO department(name) VALUES ('${name}');`);
         return console.log("added");
         } catch (err) {
             console.log(err);
         }
     }

     async updateEmployee(firstname, role, manager){
        

        const roleid = await this.getRoleId(role);
        
        const managerid  = await this.getManagerId(manager);
        
         
        try{
        await this.query(`UPDATE employee SET role_id = ${roleid}, manager_id = ${managerid} WHERE employee.first_name = '${firstname}';`);
        return console.log("Updated");
        } catch (err) {
            console.log(err);
        }
    }





}
module.exports = DB;


