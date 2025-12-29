const express = require("express");
const router = express.Router();
const controller = require("../controllers/resourceController");

// CREATE
router.post("/", controller.createResource);

// READ
router.get("/", controller.getResources);

// UPDATE
router.put("/:id", controller.updateResource);

// DELETE
router.delete("/:id", controller.deleteResource);

module.exports = router;
