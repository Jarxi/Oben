const express = require('express');
const { expense } = require('../controllers');
const { authUtil } = require('../utils');
const router = express.Router();


router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);


router.post("/category", expense.createCategory);
router.get("/category", expense.getCategories);
router.delete("/category", expense.deleteCategory);
module.exports = router;
