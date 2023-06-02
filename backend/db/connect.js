require("dotenv").config();
const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

// RDS에 접속합니다.
connection.connect(function (err) {
  if (err) {
    throw err; // 접속에 실패하면 에러를 throw 합니다.
  } else {
    // 접속시 쿼리를 보냅니다."
    console.log("데이터베이스 접속에 성공하였습니다.");
  }
});
