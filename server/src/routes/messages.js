const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// GET /api/messages/:roomId?limit=50
router.get("/:roomId", auth, async (req, res) => {
  const { roomId } = req.params;
  const limit = Math.min(parseInt(req.query.limit || "50", 10), 200);
  const messages = await Message.find({ roomId }).sort({ createdAt: -1 }).limit(limit);
  res.json(messages.reverse());
});

module.exports = router;
