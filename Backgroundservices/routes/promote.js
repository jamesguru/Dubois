const express = require("express");
const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../Helpers/sendMail");
const router = express.Router();

router.post("/", (req, res) => {
  const email = "jameskagunga15@gmail.com";

  const { promote } = req.body;


  if (promote.length > 0) {
    ejs.renderFile(
      "templates/promote.ejs",
      {
        products: promote,
      },
      async (err, data) => {
        let messageoption = {
          from: process.env.EMAIL,
          to: email,
          subject: "Your order has been created successfully",
          html: data,
        };
        await sendMail(messageoption);
      }
    );
  }
});

router.get("/", (req, res) => {
  console.log("promote get");
});

module.exports = router;
