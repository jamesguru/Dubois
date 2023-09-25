const express = require("express");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const cors = require("cors");

const app = express();
const userRoute = require("./routes/user");

const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const AnnoucementRoute = require("./routes/annoucement");

const CategoryRoute = require("./routes/category");

const galleryRoute = require("./routes/gallery");

const promoRoute = require("./routes/promo");

const commentsRoute = require("./routes/comments");

const sliderRoute = require("./routes/slider");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(cors());
app.use("/api/carts", cartRoute);
app.use("/api/slider", sliderRoute);
app.use("/api/annoucement", AnnoucementRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/promotion", promoRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  process.env.PORT
    ? console.log(`Server started on ${process.env.PORT}`)
    : console.log("server started at port 5000");
});
