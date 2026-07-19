import mysql from 'mysql2/promise';

const DB = mysql.createPool({
  uri: process.env.MYSQL_URL,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

export default DB;