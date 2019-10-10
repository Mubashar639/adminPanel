const Router = require("express").Router();
const multer = require("multer");
const Products = require("../models/foodModel");
const errAsync = require("../utils/asynError")

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
      const ext=file.mimetype.split("/")[1]
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

Router.route("/")
  .get((req, res, next) => {
    Products.find({}, (err, products) => {
      if (err) return err;
      res.setHeader("content-type", "application/json");
      res.statusCode = 200;
      res.json({
        success: true,
        messages: "Products fetched successfully",
        foods: products
      });
    });
  })
  .post(upload.single("photo"), (req, res, next) => {
    const { name, price,path, description } = req.body;
    console.log(req.file)
    console.log(req.body)
    Products.create(
      {
        name,
        price,
        description,
        path,
        image: req.file.filename
      },
      (err, product) => {
        if (err) return next(err);
        res.setHeader("conent-type", "application/json");
        res.statusCode = 201;
        res.json({
          message: "Product created successfully",
          success: true,
          food: product
        });
      }
    );
  })


  Router.route("/:id")
  .patch(upload.single("photo"), errAsync( async(req, res, next) => {
     if(req.file) req.body.image=req.file.filename
    const food = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
  })
  res.status(200).json({
      success: true,
     food
  })
  }))
  .delete(errAsync(async (req, res, next) => {
    const product = await Products.findByIdAndDelete(req.params.id)
    res.status(204).json({
        success: true,
    })
}))

module.exports = Router;
