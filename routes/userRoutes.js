// const express = require("express");
// const router = express.Router();

// // Dummy Data (Replace with DB Later)
// let users = [];

// // Create User
// router.post("/users", (req, res) => {
//   const user = { id: users.length + 1, ...req.body };
//   users.push(user);
//   res.status(201).json(user);
// });

// // Read Users
// router.get("/users", (req, res) => {
//   res.json(users);
// });

// // Read Single User
// router.get("/users/:id", (req, res) => {
//   const user = users.find((u) => u.id == req.params.id);
//   if (!user) return res.status(404).json({ message: "User not found" });
//   res.json(user);
// });

// // Update User
// router.put("/users/:id", (req, res) => {
//   const userIndex = users.findIndex((u) => u.id == req.params.id);
//   if (userIndex === -1) return res.status(404).json({ message: "User not found" });

//   users[userIndex] = { ...users[userIndex], ...req.body };
//   res.json(users[userIndex]);
// });

// // Delete User
// router.delete("/users/:id", (req, res) => {
//   users = users.filter((u) => u.id != req.params.id);
//   res.json({ message: "User deleted successfully" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create User
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read Single User
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update User
router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete User
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
