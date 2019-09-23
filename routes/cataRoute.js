const express = require("express");
const Router = express.Router();
const Categories = require("../models/cataModel");
// const authenticate = require("../authenticate");

Router.route("/")
  .get( (req, res, next) => {
    Categories.find({}, (err, categories) => {
      if (err) return next(err);
      res.setHeader("content-type", "application/json");
      res.statusCode = 200;
      res.json({
        message: "Categories fetched successfully",
        success: true,
        categories
      });
    });
  })
  // authenticate.verifyUser, 
  .post((req, res, next) => {
    const { parentPath, node } = req.body;
    if (parentPath) {
      Categories.findOne({ path: parentPath }, (err, parentNode) => {
        parentNode.children.push(node.path);
        parentNode.save(err => {
          if (err) return next(err);
          Categories.create(node, (err, category) => {
            if (err) return next(err);
            Categories.find({}, (err, categories) => {
              if (err) return next(err);
              res.setHeader("content-type", "application/json");
              res.statusCode = 200;
              res.json({
                message: "Categories fetched successfully",
                success: true,
                categories
              });
            });
          });
        });
      });
    } else {
      node.isRoot = true;
      Categories.create(node, (err, category) => {
        if (err) return next(err);
        Categories.find({}, (err, categories) => {
          if (err) return next(err);
          res.setHeader("content-type", "application/json");
          res.statusCode = 200;
          res.json({
            message: "Categories fetched successfully",
            success: true,
            categories
          });
        });
      });
    }
  });

module.exports = Router;
