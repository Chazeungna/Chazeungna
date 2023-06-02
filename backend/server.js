const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

require("dotenv").config();
const mysql = require("mysql2");

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log("포트 " + port + "번에서 실행중");
});

const APIKEY = "696e56735072657639375a51534b6f";
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
let request = require("request");
var url =
  "http://openapi.seoul.go.kr:8088/" + APIKEY + "/json/GetParkingInfo/1/5/";

request(
  {
    url: url,
    method: "GET",
  },
  function (error, response, body) {
    var json_data = JSON.parse(body).GetParkingInfo;
    // console.log(json_data);
    connection.query(
      `CREATE OR REPLACE VIEW cur_parking_db AS
      SELECT *
      FROM JSON_TABLE('${JSON.stringify(json_data.row)}', '$[*]'
        COLUMNS(
          name  varchar(255) PATH '$.PARKING_NAME', 
          color int PATH '$.CAPACITY',
          price int PATH '$.CUR_PARKING',
          latitude decimal(8, 6) PATH '$.LAT',
          longitude decimal(9, 6) PATH '$.LNG'
        )
      ) AS jt`,
      function (err, rows, fields) {
        console.log(err);
        console.log(fields);
        console.log(rows); // 결과를 출력합니다!
      }
    );
  }
);
