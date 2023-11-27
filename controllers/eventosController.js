const Evento = require("../models/eventos");

exports.crearEvento = async (request, response) => {
    try {
        let evento;
        evento = new Evento(request.body);
        await evento.save();
        response.send(evento)
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Hubo un error')
    }
}


exports.obtenerEventos = async (request, response) => {

    try {
        let eventos = await Evento.find();
        response.json(eventos)
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Hubo un error')
    }
}


exports.actualizarEvento = async (request, response) => {

    try {
        const {email, name, dataStart, dataEnd, description, direccion, region, provincia, busqueda, isPublished } = request.body;
        let evento = await Evento.findById(request.params.id);

        if (!evento) {
            response.status(404).json({ msg: 'No existe el evento'})
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
        

        evento = await Evento.findOneAndUpdate({_id: request.params.id}, evento, {new: true});
        response.json()
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Hubo un error')
    }
}


exports.obtenerEvento = async (request, response) => {

    try {
        let evento = await Evento.findById(request.params.id);
        if (!evento) {
            response.status(404).json({ msg: 'No existe el evento'})
        }
        response.json(evento)
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Hubo un error')
    }
}


exports.eliminarEvento = async (request, response) => {

    try {
        let evento = await Evento.findById(request.params.id);

        if (!evento) {
            response.status(404).json({ msg: 'No existe el evento'})
        }
        await Evento.findOneAndRemove({_id: request.params.id})
        response.json({msg: 'Evento eliminado'})
    }
    catch (error) {
        console.log(error);
        response.status(500).send('Hubo un error')
    }
}