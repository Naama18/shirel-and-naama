var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", async function (req, res) {
  const response = await apiReq.Post("post", req);
  console.log("response: ", response);

  res.send(response);
});
//get all  posts
// router.get("/", async function (req, res) {
//   const response = await apiReq.Get("post");
//   console.log("response: ", response);
//   res.send(response);
// });
// get all posts
router.get("/", async function (req, res) {
  console.log("req.query.page ", req.query.page);
  console.log("req.query.limit ", req.query.limit);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const offset = (page - 1) * limit;

  const response = await apiReq.Get("post", { limit, offset });

  console.log("response: ", response);

  res.send(response);
});
// get post of some user
router.get("/:userid", async function (req, res) {
  const response = await apiReq.Get("post", req.params.userid);
  console.log("response: ", response);
  res.send(response);
});
router.patch("/:userid/:id", async function (req, res) {
  const response = await apiReq.Patch(
    "post",
    req,
    req.params.userid,
    req.params.id
  );
  console.log("response: ", response);
  res.send(response);
});
router.delete("/:userId/:id", async function (req, res) {
  const response = apiReq.Delete("post", req.params.userId, req.params.id);
  console.log("response: ", response);
  res.send(response);
});
module.exports = router;
