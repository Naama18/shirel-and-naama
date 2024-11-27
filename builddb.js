const mysql = require("mysql");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
});

function buildDb() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE jsonplaceholder", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
}
buildDb();
