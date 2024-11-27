const fs = require("fs");
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "jsonplaceholder",
});

async function readFolder() {
  try {
    const files = await fs.promises.readdir("entities");
    return files;
  } catch (err) {
    console.log("Error reading folder:", err);
    throw err;
  }
}

async function readContent(fileName) {
  try {
    const content = await fs.promises.readFile(fileName, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.log("Error reading file:", err);
    throw err;
  }
}
function convertObjToString(obj) {
  let objString = "";
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    objString += keys[i].toString() + " " + obj[keys[i]].toString() + ", ";
  }
  return objString.slice(0, objString.length - 2);
}
async function createTable() {
  try {
    const files = await readFolder();
    console.log(files);

    for (const file of files) {
      console.log("Processing file:", file);
      const content = await readContent("entities/" + file);
      console.log("Content:", content);
      const stringContent = convertObjToString(content);
      console.log("stringContent: ", stringContent);

      const tableName = file.split(".")[0];
      console.log("tableName: ", tableName);
      const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${stringContent})`;

      con.query(sql, function (err, result) {
        if (err) {
          console.log("Error creating table:", err);
          return;
        }
        console.log(`Table ${tableName} created`);
      });
    }
  } catch (err) {
    console.log("Error in createTable:", err);
  }
}

createTable();
