

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;


// Connect to database
const pool = new Pool(
  {
    user: 'postgres',
    password: 'post',
    host: 'localhost',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
)



module.exports = pool;