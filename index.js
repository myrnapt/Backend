require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5038;


app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use("/api/mercados-mediavales", require("./routes/eventos"));

mongoose.set();


const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
conectarDB().then(() => {
  app.listen(port, () => {
    console.log("Conectado");
  });
})
