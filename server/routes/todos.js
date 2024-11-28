var express = require("express");
const apiReq = require("../functions/apiRequests");

var router = express.Router();

router.get("/:userid", async function (req, res) {
  try {
    const response = await apiReq.Get("todos", req.params.userid);
    console.log("response: ", response);

    if (!response || response.length === 0) {
      return res.status(404).send({ error: "No todos found for this user" });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during GET todos:", error);
    res.status(500).send({ error: "An error occurred while fetching todos" });
  }
});

router.post("/:userid", async function (req, res) {
  try {
    const response = await apiReq.Post("todos", req);
    console.log("response: ", response);

    res.status(201).send(response);
  } catch (error) {
    console.error("Error during POST todo:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the todo" });
  }
});

router.patch("/:userid/:id", async function (req, res) {
  try {
    const response = await apiReq.Patch(
      "todos",
      req,
      req.params.userid,
      req.params.id
    );
    console.log("response: ", response);

    if (!response) {
      return res
        .status(404)
        .send({ error: "Todo not found or failed to update" });
    }

    res.status(200).send(response);
  } catch (error) {
    console.error("Error during PATCH todo:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the todo" });
  }
});

router.delete("/:userId/:id", async function (req, res) {
  try {
    const response = await apiReq.Delete(
      "todos",
      req.params.userId,
      req.params.id
    );
    console.log("response: ", response);

    if (!response) {
      return res
        .status(404)
        .send({ error: "Todo not found or failed to delete" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error during DELETE todo:", error);
    res
      .status(500)
      .send({ error: "An error occurred while deleting the todo" });
  }
});

module.exports = router;
