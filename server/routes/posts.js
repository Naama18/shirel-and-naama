var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", async function (req, res) {
  try {
    const response = await apiReq.Post("post", req);
    console.log("response: ", response);

    res.status(201).send(response);
  } catch (error) {
    console.error("Error during POST:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the post" });
  }
});

router.get("/", async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const response = await apiReq.Get("post", { limit, offset });
    console.log("response: ", response);

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during GET:", error);
    res.status(500).send({ error: "An error occurred while fetching posts" });
  }
});

router.get("/:userid", async function (req, res) {
  try {
    const response = await apiReq.Get("post", req.params.userid);
    console.log("response: ", response);

    if (!response || response.length === 0) {
      return res.status(404).send({ error: "No posts found for this user" });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during GET user posts:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching posts for the user" });
  }
});

router.patch("/:userid/:id", async function (req, res) {
  try {
    const response = await apiReq.Patch(
      "post",
      req,
      req.params.userid,
      req.params.id
    );
    console.log("response: ", response);

    if (!response) {
      return res
        .status(404)
        .send({ error: "Post not found or failed to update" });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during PATCH:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the post" });
  }
});

router.delete("/:userId/:id", async function (req, res) {
  try {
    const response = await apiReq.Delete(
      "post",
      req.params.userId,
      req.params.id
    );
    console.log("response: ", response);

    if (!response) {
      return res
        .status(404)
        .send({ error: "Post not found or failed to delete" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error during DELETE:", error);
    res
      .status(500)
      .send({ error: "An error occurred while deleting the post" });
  }
});

module.exports = router;
