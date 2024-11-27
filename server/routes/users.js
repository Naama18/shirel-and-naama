var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", function (req, res) {
  apiReq.Post("user", req);

  res.send("asdasd");
});
router.patch("/:userId", function (req, res) {
  apiReq.Patch("user", req, req.params.userId, null);
});
module.exports = router;
