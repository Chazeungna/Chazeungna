var mysql = require("mysql2");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const db = require("./config/mysql.js");

var db_info = {
  host: "localhost", // 데이터베이스 주소
  port: "3306", // 데이터베이스 포트
  user: "root", // 로그인 계정
  password: "ym51358136", // 비밀번호
  database: "parkingmap", // 엑세스할 데이터베이스
};
module.exports = {
  init: function () {
    return mysql.createConnection(db_info);
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error("mysql connection error : " + err);
      else console.log("mysql is connected successfully!");
    });
  },
};
