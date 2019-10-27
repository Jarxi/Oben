const moment = require('moment');
const { ExpenseCategory } = require('../models');
const sendErr = require('../utils/sendErr');

const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const exist = await ExpenseCategory.findOne({category_name: category.category_name});
    if (exist.length !== 0){
      return res.status(500).json({
        message: "Category already exists!"
      });
    }
    const createdCategory = await ExpenseCategory.create(category);
    return res.status(200).json({
      message: "category created!",
      createdCategory
    });
  }catch (err){
    return sendErr(res, err);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await ExpenseCategory.find({}, {category_name: 1});
    return res.status(200).json({
      message: "Categories Found!",
      categories
    });
  } catch (err){
    return sendErr(res, err);
  }
};


// if you add functions above, add it here too
module.exports = {
  createCategory,
  getCategories
};
