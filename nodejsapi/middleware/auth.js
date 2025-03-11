const express = require("express");
const { requireAuth } = require("@clerk/express"); // ✅ Corrected import

const router = express.Router();

// Protect a route (require authentication)
router.get("/protected", requireAuth(), (req, res) => {
  res.json({ message: "You have access to this protected route!" });
});

module.exports = router;
