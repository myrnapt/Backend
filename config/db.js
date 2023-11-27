const mongoose = require("mongoose");
require("dotenv").config({ path: "./variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDB;
