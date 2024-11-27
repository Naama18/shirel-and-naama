var express = require("express");
const apiReq = require("../functions/apiRequests");

var router = express.Router();
router.post("/", async function (req, res) {
  console.log("in todos");
  await apiReq.Post("todos", req);

  res.send("asdasd");
});

router.get("/:userid", function (req, res) {
  apiReq.Get("todos", req.params.userid);
});
module.exports = router;
