var express = require('express');
var router = express.Router();
const { con } = require("../con");
const util = require("util");
const query = util.promisify(con.query).bind(con);

// validate user credentials
async function validateUser(username, password) {
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
  const result = await query(sql, [username, password]);
  return result.length > 0; // Returns true if user exists, false otherwise
}

//log in a user
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Ensure all required fields are provided
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Check if the username and password match a user in the database
    const isValid = await validateUser(username, password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
