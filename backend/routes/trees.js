const express = require("express");
const router = express.Router();
const treeController = require("../controllers/treeController");

router.get("/", treeController.getTrees);

router.get("/:id", treeController.getTree);

router.post("/", treeController.createTree);

router.delete("/:id", treeController.deleteTree);

router.patch("/:id", treeController.updateTree);

module.exports = router;
