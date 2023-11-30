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

app.use(cors({
  origin: 'http://localhost:4200', // Update this with your client's origin
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());


// Routes
app.get('/', (req, res) => {
  res.send({ title: 'Eventos' });
});

app.get('/eventos', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
});

app.post('/eventos', async (req, res) => {
  try {
    const evento = new Evento(req.body);
    await evento.save();
    res.send(evento);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
});

app.put('/eventos/:id', async (req, res) => {
  try {
    const { email, name, dataStart, dataEnd, description, direccion, region, provincia, busqueda, isPublished } = req.body;
    let evento = await Evento.findById(req.params.id);

    if (!evento) {
      res.status(404).json({ msg: 'No existe el evento' });
    }

    evento.email = email;
    evento.name = name;
    evento.dataStart = dataStart;
    evento.dataEnd = dataEnd;
    evento.busqueda = busqueda;
    evento.description = description;
    evento.direccion = direccion;
    evento.region = region;
    evento.provincia = provincia;
    evento.isPublished = isPublished;

    evento = await Evento.findOneAndUpdate({ _id: req.params.id }, evento, { new: true });
    res.json(evento);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
});

app.get('/eventos/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) {
      res.status(404).json({ msg: 'No existe el evento' });
    }
    res.json(evento);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
});

app.delete('/eventos/:id', async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);

    if (!evento) {
      res.status(404).json({ msg: 'No existe el evento' });
    }
    await Evento.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Evento eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
});

// Conectar a la base de datos antes de escuchar
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Escuchando peticiones');
  });
});
