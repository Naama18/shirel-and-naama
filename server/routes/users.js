var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", function (req, res) {
  apiReq.Post("user", req);

  res.send("asdasd");
});

module.exports = router;
