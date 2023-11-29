const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

// CREAR SERVIDOR
const app = express();

// CONECTAMOS A LA BASE DE DATOS

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use("/api/mercados-mediavales", require("./routes/eventos"));

const port = process.env.PORT || 5038;
conectarDB().then(() => {
  app.listen(port, () => {
    console.log("Conectado");
  });
})
