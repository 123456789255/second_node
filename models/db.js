const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root', // ваш пользователь базы данных
  password: '',// ваш пароль
  database: 'mvc_example'// название вашей базы данных
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to database');
// });

module.exports = db.promise();
