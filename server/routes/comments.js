var express = require("express");
var router = express.Router();
const apiReq = require("../functions/apiRequests");

router.post("/", async function (req, res) {
  try {
    const response = await apiReq.Post("comment", req);
    console.log("response: ", response);

    res.status(201).send(response);
  } catch (error) {
    console.error("Error during POST:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the comment" });
  }
});

router.get("/:postId", async function (req, res) {
  try {
    const response = await apiReq.Get("comment", req.params.postId);
    console.log("response: ", response);

    if (!response || response.length === 0) {
      return res.status(404).send({ error: "No comments found for this post" });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during GET comments:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching comments" });
  }
});

router.patch("/:name/:id", async function (req, res) {
  try {
    const response = await apiReq.Patch(
      "comment",
      req,
      req.params.name,
      req.params.id
    );
    console.log("response: ", response);

    if (!response) {
      return res
        .status(404)
        .send({ error: "Comment not found or failed to update" });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during PATCH comment:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the comment" });
  }
});

router.delete("/:name/:id", async function (req, res) {
  try {
    const response = await apiReq.Delete(
      "comment",
      req.params.name,
      req.params.id
    );
    console.log("response: ", response);

    if (!response) {
      return res
        .status(404)
        .send({ error: "Comment not found or failed to delete" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error during DELETE comment:", error);
    res
      .status(500)
      .send({ error: "An error occurred while deleting the comment" });
  }
});

module.exports = router;
