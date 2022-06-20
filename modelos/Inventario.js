const {Schema, model} = require('mongoose');

const InventarioSchema = Schema({
	serial:{
        type: String,
        require: true,
        unique: true,
    }, 
    modelo:{
        type: String,
        require: true,
    },
	descripcion:{
        type: String,
        require: true,
    },
    color:{
        type: String,
        require: true,
    },
    foto:{
        type: String,
        require: true,
    },
    precio:{
        type: Number,
        require: true,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: false,
    },
	marca:{
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        require: true,
    },
	tipoEquipo:{
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        require: true, 
    },
	estadoEquipo:{
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        require: true, 
    },
    fechaCompra:{
        type: Date,
        require: true,
    },
	fechaCreacion:{
        type: Date,
        require: true,
    },
	fechaActualizacion:{
        type: Date,
        require: true
    }
});

module.exports = model('inventario', InventarioSchema);