require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5038;


mongoose.set('strictQuery', false);
const conectarDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};



app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use("/api/mercados-mediavales", require("./routes/eventos"));

conectarDB().then(() => {
  app.listen(port, () => {
    console.log("Conectado");
  });
})
