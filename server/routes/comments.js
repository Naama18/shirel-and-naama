var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

// router.post("/:userid", async function (req, res) {
//   const response = await apiReq.Post("todos", req);
//   console.log("response: ", response);
//   res.send(response);
// });
router.post("/", async function (req, res) {
  const response = await apiReq.Post("comment", req);
  console.log("response: ", response);
  res.send(response);
});

router.get("/:postId", async function (req, res) {
  const response = await apiReq.Get("comment", req.params.postId);
  console.log("response: ", response);
  res.send(response);
});
router.patch("/:name/:id", async function (req, res) {
  const response = await apiReq.Patch(
    "comment",
    req,
    req.params.name,
    req.params.id
  );
  console.log("response: ", response);
  res.send(response);
});
router.delete("/:name/:id", async function (req, res) {
  const response = await apiReq.Delete(
    "comment",
    req.params.name,
    req.params.id
  );
  console.log("response: ", response);
  res.send(response);
});
module.exports = router;
