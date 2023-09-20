const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

//CREATE

router.post("/", async (req, res) => {
  const newProduct = Product(req.body);

  try {
    const product = await newProduct.save();

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(error);
  }
});

//UPDATED

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json("Product has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET PRODUCTS OF SHOP

router.get('/shop/:shopId/products', async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const products = await Product.find({ shopId }); // Assuming 'shopId' matches the field in your product documents
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//GET RELATED

router.get("/related/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();

    const related = await Product.find({
      _id: { $ne: product._id },

      brand: product.brand,
    })
      .limit(50)
      .populate("categories")
      .exec();

    res.status(200).json(related);
  } catch (error) {
    res.status(200).json(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qNew = req.query.new;

  const qCategory = req.query.category;

  const qSearch = req.query.search;

  const page = req.query.page;

  const limit = req.query.limit;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    } else if (qSearch) {
      products = await Product.find({
        $text: {
          $search: qSearch,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    } else {
      products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(200).json(error);
  }
});

// RATING

router.put("/ratings/:productId", async (req, res) => {
  const { star, name, comment, postedBy } = req.body;

  try {
    if (star) {
      const postedRating = await Product.findByIdAndUpdate(
        req.params.productId,
        { $push: { ratings: { star, name, comment, postedBy } } },
        { new: true }
      );

      res.status(201).json(postedRating);
    } else {
      res.status(401).json("no rating");
    }
  } catch (error) {
    res.status(500).json("something went wrong");
  }
});

module.exports = router;
