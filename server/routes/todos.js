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
router.patch("/:userid/:id", function (req, res) {
  apiReq.Patch("todos", req, req.params.userid, req.params.id);
});
router.delete("/:userId/:id", function (req, res) {
  console.log("im at router comment");
  apiReq.Delete("todos", req.params.userId, req.params.id);
});
module.exports = router;
