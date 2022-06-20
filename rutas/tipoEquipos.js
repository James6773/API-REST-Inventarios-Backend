const {Router} = require('express');
const TipoEquipo = require('../modelos/TipoEquipo');
const {validarTipoEquipo} = require('../helpers/validar-tipoEquipo');
const router = Router();

router.get('/', async function(req, res) {

    try {
        const tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);
    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
   
});

router.post('/', async function(req, res) {
    
    try {

        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        
        let tipoEquipo = new TipoEquipo();

        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('¡Ocurrió un error!');
    }
});

router.put('/:tipoEquipoId', async function(req, res) {

    try {
        
        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);

        if (!tipoEquipo){
            return res.status(400).send("¡No existe el tipo de equipo!");
        }
    
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);
        
     } catch (error) {
         console.log(error); 
         res.status(500).send("¡Ocurrió un error en el servidor!");
     }
    
});

router.get('/:tipoEquipoId', async function(req, res) {

    try {

        const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);

        if (!tipoEquipo) {
            return res.status(404).send("¡El tipo de equipo no existe!");
        }

        res.send(tipoEquipo);

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.delete('/:tipoEquipoId', async function(req, res) {
    try {

        const tipoEquipo = await TipoEquipo.findByIdAndDelete(req.params.tipoEquipoId);
        
        if (!tipoEquipo) {
            return res.status(404).send("¡El tipo de equipo no existe!");
        }

        res.send("¡El tipo de equipo fue eliminado con éxito!");

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

module.exports = router;