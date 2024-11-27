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
router.patch("/:userid/:id", function (req, res) {
  apiReq.Patch("post", req, req.params.userid, req.params.id);
});
router.delete("/:userId/:id", function (req, res) {
  console.log("im at router comment");
  apiReq.Delete("post", req.params.userId, req.params.id);
});
module.exports = router;
