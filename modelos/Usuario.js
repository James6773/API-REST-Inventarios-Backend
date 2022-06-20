const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
	nombre:{
        type: String,
        require: true,
    }, 
    email:{
        type: String,
        require: true,
        unique: true,
    },
	estado:{
        type: String,
        require: true,
        enum: ['Activo', 'Inactivo']
    },
	fechaCreacion: {
        type: Date,
        require: true,
    },
	fechaActualizacion:{
        type: Date,
        require: true
    }
});

module.exports = model('Usuario', UsuarioSchema);