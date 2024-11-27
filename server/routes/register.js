var express = require("express");
var router = express.Router();
const { Post } = require("../functions/apiRequests");
const { con } = require("../con");
const util = require("util");
const query = util.promisify(con.query).bind(con);
let result = null;
// check if the user already exists
async function isUserExists(username) {
  const sql = "SELECT * FROM user WHERE username = ?";
  result = await query(sql, [username]);
  return result.length > 0;
}
// Route to register a new user
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // all required fields are provided
  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the username already exists
    const userExists = await isUserExists(username);
    console.log("userExists: ", userExists);

    if (userExists) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const id = await Post("user", { body: { username, password } });

    res.status(201).json({ message: "User registered successfully", id });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
