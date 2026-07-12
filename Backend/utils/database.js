import mysql from 'mysql2/promise'

export default  mysql.createPool({
  host : "localhost",
  user:"root",
  password : "Abhi@2903",
  database : "threadcode_db"
});