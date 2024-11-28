var express = require("express");
const apiReq = require("../functions/apiRequests");

var router = express.Router();

router.get("/:userid", async function (req, res) {
  const response = await apiReq.Get("todos", req.params.userid);
  console.log("response: ", response);
  res.send(response);
});

router.post("/:userid", async function (req, res) {
  const response = await apiReq.Post("todos", req);
  console.log("response: ", response);
  res.send(response);
});
router.patch("/:userid/:id", function (req, res) {
  const response = apiReq.Patch("todos", req, req.params.userid, req.params.id);
  console.log("response: ", response);
  res.send(response);
});
router.delete("/:userId/:id", function (req, res) {
  const response = apiReq.Delete("todos", req.params.userId, req.params.id);
  console.log("response: ", response);
  res.send(response);
});
module.exports = router;
