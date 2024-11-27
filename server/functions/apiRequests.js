var express = require("express");
var router = express.Router();
const { con } = require("../con");
const util = require("util");
const query = util.promisify(con.query).bind(con);
const mysql = require("mysql");
const postTableApi = {
  user: ["name", "username", "password"],
  post: ["userId", "title", "body"],
  todos: ["userId", "title", "completed"],
  comments: ["postId", "name", "body"],
};
const getTableApi = {
  post: "userId",
  todos: "userId",
  comment: "postId",
};
const patchTableApi = {
  post: ["title", "body", "userId"],
  todos: ["title", "completed", "userId"],
  comment: ["body", "name"],
  user: ["username", "password", "id"],
};

exports.Post = async function (tableName, req) {
  console.log("tableName: ", tableName);
  const sql = `INSERT INTO ${tableName} (${postTableApi[tableName][0]}, ${postTableApi[tableName][1]}, ${postTableApi[tableName][2]}) VALUES (?, ?,?)`;

  const bodyReq = [
    req.body[postTableApi[tableName][0]],
    req.body[postTableApi[tableName][1]],
    req.body[postTableApi[tableName][2]],
  ];
  console.log("sql: ", sql);
  await query(sql, bodyReq, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
};
// get all from table
exports.Get = async function (tableName, param = null) {
  if (param === null) {
    const sql = `SELECT * FROM ${tableName}`;
    await query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  } else {
    const sql = `SELECT * FROM ${tableName} where ${getTableApi[tableName]} = ${param}`;
    await query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
};
exports.Patch = async function (tableName, req, param) {
  console.log("tableName: ", tableName);
  console.log("IM AT THE FETCH");
  if (tableName !== "comment") {
    console.log("not supposed to be here");
    if (req.body[patchTableApi[tableName][0]] !== undefined) {
      const sql = `UPDATE ${tableName} SET ${patchTableApi[tableName][0]} = ? WHERE  ${patchTableApi[tableName][2]} = ?`;
      await query(
        sql,
        [req.body[patchTableApi[tableName][0]], param],
        function (err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
    } else if (req.body[patchTableApi[tableName][1]] !== undefined) {
      const sql = `UPDATE ${tableName} SET ${patchTableApi[tableName][1]} = ? WHERE  ${patchTableApi[tableName][2]} = ?`;
      await query(
        sql,
        [req.body[patchTableApi[tableName][1]], param],
        function (err, result) {
          if (err) throw err;
          console.log(result);
        }
      );
    }
  } else if (tableName === "comment") {
    console.log("Im at the comment");
    const sql = `UPDATE ${tableName} SET body = ? WHERE name = ?`;
    console.log("req: ", req, req.body);
    await query(sql, [req.body.body, param], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
};
