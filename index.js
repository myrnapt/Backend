require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Evento = require('./models/eventos');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5038;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://your-frontend.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
// Routes
app.get('/', (req, res) => {
  res.send({ title: 'Eventos' });
});

app.get('/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
});

app.post('/eventos', async (req, res) => {
  try {
    const evento = new Evento(req.body);
    await evento.save();
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
});

// ...
app.put('/eventos/:id', async (req, res) => {
  try {
    console.log('PRUEBA PUT');
    const { email, name, dataStart, dataEnd, description, direccion, region, provincia, busqueda, isPublished } = req.body;

    const updatedEvento = await Evento.findByIdAndUpdate(
      req.params.id,
      { email, name, dataStart, dataEnd, description, direccion, region, provincia, busqueda, isPublished },
      { new: true }
    );

    if (!updatedEvento) {
      return res.status(404).json({ msg: 'No existe el evento' });
    }

    res.json(updatedEvento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
});


app.get('/eventos/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      return res.status(404).json({ msg: 'No existe el evento' });
    }
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
});

app.delete('/eventos/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);

    if (!evento) {
      return res.status(404).json({ msg: 'No existe el evento' });
    }

    await Evento.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Evento eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
});


// Conectar a la base de datos antes de escuchar
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Escuchando peticiones');
  });
});
