var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", function (req, res) {
  apiReq.Post("user", req);

  res.send("asdasd");
});
router.patch("/:userId", async function (req, res) {
  const response = await apiReq.Patch("user", req, req.params.userId, null);
  console.log("response: ", response);
  send(res.send(response));
});
module.exports = router;
