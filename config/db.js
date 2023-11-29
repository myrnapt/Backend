const mongoose = require("mongoose");
require("dotenv").config({ path: "./variables.env" });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = conectarDB;
