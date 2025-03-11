const express = require("express");
const { requireAuth, clerkClient } = require("@clerk/express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

/**
 * Store user details in the database after authentication.
 */
router.post("/store-user", async (req, res) => {
  try {
    const { clerkId, firstname, lastname, username, email, imageUrl } = req.body;

    // Check if user already exists
    let user = await User.findOne({ clerkId, email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      clerkId,
      firstname,
      lastname,
      username,
      email,
      imageUrl,
      admin: false,
      active: false, // Needs manual activation
    });

    await user.save();

     // ✅ Update Clerk profile with generated password & username
    await clerkClient.users.updateUser(clerkId, {
      username, // Storing username
      firstName: firstname, // Storing first name
    });

    res.status(201).json({ message: "User stored successfully", user });
  } catch (error) {
    console.error("Error storing user:", error);
    res.status(500).json({ error: "Error storing user" });
  }
});

/**
 * Retrieve all users (Admin Only).
 */
router.get("/get-users", requireAuth(), async (req, res) => {
  try {
    // Ensure the user is an admin
    if (!req.auth.user.admin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
  }
});

/**
 * Update user details (Requires authentication and active status).
 */
router.put("/update-user/:id", requireAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, active, password } = req.body;

    // Ensure the user account is active
    if (!req.auth.user.active) {
      return res.status(403).json({ message: "Your account is not active" });
    }

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.username = username;
    user.email = email;
    if (password) {
      user.password = password;
    }

    await user.save();

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

module.exports = router;
