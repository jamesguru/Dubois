const express = require("express");

const router = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const CryptoJs = require("crypto-js");

const User = require("../models/User");

//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findOneAndDelete(req.params.id);

    res.status(200).json("The user has been deleted");
  } catch (error) {
    res.status(500).json("You are not authorized for this operation");
  }
});

//GET

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL USERS

router.get("/", async (req, res) => {
  const query = req.query.new;

  try {
    const users = (await query)
      ? User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USERS STATS

router.get("/stats", async (req, res) => {
  const date = new Date();

  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },

      {
        $project: {
          month: { $month: "createdAt" },
        },
      },

      {
        $group: {
          _id: "$month",

          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD CUSTOMERS

router.put("/customer/:sellerId", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    if (email) {
      const seller = await User.findByIdAndUpdate(
        req.params.sellerId,
        { $push: { ratings: {name,email,phone} } },
        { new: true }
      );

      res.status(201).json(seller);
    } else {
      res.status(401).json("unable to add customer");
    }
  } catch (error) {
    res.status(500).json("something went wrong");
  }
});

// RATING

router.put("/ratings/:sellerId", async (req, res) => {
  const { star, name, comment, postedBy } = req.body;

  try {
    if (star) {
      const postedRating = await Product.findByIdAndUpdate(
        req.params.sellerId,
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
