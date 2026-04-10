const express = require("express");
const router = express.Router();
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

// GET all grievances
router.get("/", auth, async (req, res) => {
  const data = await Grievance.find().sort({ createdAt: -1 });
  res.json(data);
});

// CREATE grievance
router.post("/", auth, async (req, res) => {
  const g = new Grievance({
    ...req.body,
    status: "pending",
    votes: 0,
    timeline: [{ status: "pending" }]
  });

  await g.save();
  res.json({ msg: "Created" });
});

// VOTE
router.put("/vote/:id", auth, async (req, res) => {
  await Grievance.findByIdAndUpdate(req.params.id, {
    $inc: { votes: 1 }
  });

  res.json({ msg: "voted" });
});

// COMMENT
router.put("/comment/:id", auth, async (req, res) => {
  await Grievance.findByIdAndUpdate(req.params.id, {
    $push: { comments: { text: req.body.comment } }
  });

  res.json({ msg: "comment added" });
});

// STATUS UPDATE
router.put("/status/:id", auth, async (req, res) => {
  await Grievance.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
    status: "Pending",   // FIXED
    $push: { timeline: { status: req.body.status } }
  });

  res.json({ msg: "status updated" });
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ msg: "deleted" });
});

module.exports = router;