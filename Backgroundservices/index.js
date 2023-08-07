const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { orderPendingEmail } = require("./Emailservice/order");
const promoteRoute = require("./routes/promote");
const cors = require('cors');
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });

  app.use(cors())
  app.use(express.json())
  app.use('/api/promote',promoteRoute);

const run = () => {
  cron.schedule("* * * * * *", () => {
   
    orderPendingEmail();
  });
};

run();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Backgroundservice is running on port ${PORT}`);
});
