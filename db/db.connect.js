const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initialDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((error) => console.log("Error in connecting database.", error));
};

module.exports = { initialDatabase };
