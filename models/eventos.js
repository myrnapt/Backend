const mongoose = require('mongoose');

const EventoSchema = mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        dataStart: {
            type: Date,
            required: true
        },
        dataEnd: {
            type: Date,
            required: true
        }, 
        busqueda: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        region: {
            type: String,
            required: true
        },
        provincia: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        organizer: {
            type: String,
            required: false
        },
        telephone: {
            type: Number,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        creationDate: {
            type: Date,
            default: Date.now()
        },
        isPublished: {
            type: Boolean,
            required: true
        }
})

module.exports = mongoose.model('Evento', EventoSchema)