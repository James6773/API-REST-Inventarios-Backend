const {Router} = require('express');
const EstadoEquipo = require('../modelos/EstadoEquipo');
const {validarEstadoEquipo} = require('../helpers/validar-estadoEquipo');
const router = Router();

router.get('/', async function(req, res) {
    
    try {
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.post('/', async function(req, res) {
    
    try {

        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        
        let estadoEquipo = new EstadoEquipo();

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('¡Ocurrió un error!');
    }
});

router.put('/:estadoEquipoId', async function(req, res) {

    try {

        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

        if (!estadoEquipo){
            return res.status(400).send("¡No existe el estado de equipo!");
        }
    
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo );
        
     } catch (error) {
         console.log(error); 
         res.status(500).send("¡Ocurrió un error en el servidor!");
     }
    
});

router.get('/:estadoEquipoId', async function(req, res) {

    try {

        const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

        if (!estadoEquipo) {
            return res.status(404).send("¡El estado de equipo no existe!");
        }

        res.send(estadoEquipo);

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.delete('/:estadoEquipoId', async function(req, res) {
    try {

        const estadoEquipo = await EstadoEquipo.findByIdAndDelete(req.params.estadoEquipoId);
        
        if (!estadoEquipo) {
            return res.status(404).send("¡El estado de equipo no existe!");
        }

        res.send("¡El estado de equipo fue eliminado con éxito!");

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});


module.exports = router;