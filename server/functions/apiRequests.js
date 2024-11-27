var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "jsonplaceholder",
});
exports.Post = function (tableName, req) {
  //   console.log("req: ", req);
  //   router.post(url, function (req, err) {
  const headers = req.body.values;
  console.log("headers: ", headers);
  console.log("headers: ", headers[0]);

  console.log("headers: ", typeof headers);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = `INSERT INTO ${tableName} (${headers[0]}, ${headers[1]}, ${headers[2]}) VALUES (?, ?,?)`;
    console.log("headers: ", headers[0]);
    console.log("headers: ", typeof headers[0]);
    const val1 = headers[0];
    const bodyReq = [
      req.body[headers[0]],
      req.body[headers[1]],
      req.body[headers[2]],
    ];
    con.query(sql, bodyReq, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      con.end();
    });
  });
};
