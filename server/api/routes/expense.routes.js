const express = require('express');
const { expense } = require('../controllers');

const router = express.Router();

// router.get("/test", (req, res) => res.json({ msg: "user Works" }));
router.post("/category", expense.createCategory);
router.get("/category", expense.getCategories);
// router.post("/signin", user.signIn);
// router.post("/resetPassword", user.resetPassword);
module.exports = router;
