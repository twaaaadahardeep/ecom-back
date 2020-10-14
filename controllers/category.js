const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ data });
  });
};

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not found!",
      });
    }
    req.category = category;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json({ message: "Category deleted!" });
  });
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(category);
  });
};

exports.list = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(categories);
  });
};
