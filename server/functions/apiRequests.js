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
  post: ["title", "body", "userId", "id"],
  todos: ["title", "completed", "userId", "id"],
  comment: ["body", "name", "name", "id"],
  user: ["username", "password", "id"],
};

exports.Post = async function (tableName, req) {
  const sql = `INSERT INTO ${tableName} (${postTableApi[tableName][0]}, ${postTableApi[tableName][1]}, ${postTableApi[tableName][2]}) VALUES (?, ?,?)`;

  const bodyReq = [
    req.body[postTableApi[tableName][0]],
    req.body[postTableApi[tableName][1]],
    req.body[postTableApi[tableName][2]],
  ];
  const res = await query(sql, bodyReq);

  return res;
};
// get all from table
exports.Get = async function (tableName, param = null) {
  console.log("param.limit", param.limit);
  console.log(param.offset);
  if (param === null) {
    const sql = `SELECT * FROM ${tableName}`;
    const res = await query(sql);
    return res;
  } else if (param.limit !== undefined && param.offset !== undefined) {
    const { limit, offset } = param;
    const sql = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`;
    const res = await query(sql, [limit, offset]);
    return res;
  } else {
    const sql = `SELECT * FROM ${tableName} where ${getTableApi[tableName]} = ${param}`;
    const res = await query(sql);
    return res;
  }
};
exports.Patch = async function (tableName, req, param1, param2) {
  //param1 = id
  //param2 = userId
  if (tableName !== "user") {
    console.log("req.body: ", req.body);

    const sql = `UPDATE ${tableName} SET ${[
      Object.keys(req.body)[0],
    ]} = ? WHERE  ${patchTableApi[tableName][2]} = ? AND ${
      patchTableApi[tableName][3]
    } = ?`;
    await query(
      sql,
      [Object.values(req.body)[0], param1, param2],
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  } else if (tableName === "user") {
    const sql = `UPDATE ${tableName} SET ${
      Object.keys(req.body)[0]
    } = ? WHERE id = ? `;
    await query(
      sql,
      [Object.values(req.body)[0], param1],
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  }
};
exports.Delete = async function (tableName, identify, id) {
  if (tableName !== "comment") {
    const sql = `DELETE FROM ${tableName} WHERE id=? AND userId = ?`;

    await query(sql, [id, identify], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  } else {
    const sql = `DELETE FROM ${tableName} WHERE id=? AND name = ?`;

    await query(sql, [id, identify], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }
};
