var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", function (req, res) {
  apiReq.Post("comment", req);

  res.send("asdasd");
});

router.get("/:postId", function (req, res) {
  apiReq.Get("comment", req.params.postId);
});
router.patch("/:name/:id", function (req, res) {
  console.log("im at router comment");
  apiReq.Patch("comment", req, req.params.name, req.params.id);
});
router.delete("/:name/:id", function (req, res) {
  console.log("im at router comment");
  apiReq.Delete("comment", req.params.name, req.params.id);
});
module.exports = router;
