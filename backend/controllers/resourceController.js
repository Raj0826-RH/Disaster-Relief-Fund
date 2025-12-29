const Resource = require("../models/Resource");

/**
 * =========================
 * CREATE RESOURCE
 * POST /api/resources
 * =========================
 */
exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    const saved = await resource.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * GET ALL RESOURCES
 * GET /api/resources
 * =========================
 */
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * UPDATE RESOURCE
 * PUT /api/resources/:id
 * =========================
 */
exports.updateResource = async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * =========================
 * DELETE RESOURCE
 * DELETE /api/resources/:id
 * =========================
 */
exports.deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
