var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", function (req, res) {
  apiReq.Post("post", req);

  res.send("asdasd");
});
router.get("/", function (req, res) {
  apiReq.Get("post");
});

router.get("/:userid", function (req, res) {
  apiReq.Get("post", req.params.userid);
});
module.exports = router;
