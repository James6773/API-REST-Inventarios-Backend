const {Router} = require('express');
const Inventario = require('../modelos/Inventario');
const {validarInventario} = require('../helpers/validar-inventario');
const router = Router();

router.get('/', async function(req, res) {

    try {

        const inventarios = await Inventario.find().populate([
            {
                path: 'usuario', select: 'nombre email estado'
            },
            {
                path: 'marca', select: 'nombre estado'
            },
            {
                path: 'tipoEquipo', select: 'nombre estado'
            },
            {
                path: 'estadoEquipo', select: 'nombre estado'
            }
        ]);
        res.send(inventarios);
    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.post('/', async function(req, res) {

    try {

        const validaciones = validarInventario(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        const existeInventarioXSerial = await Inventario.findOne({serial: req.body.serial});

        if (existeInventarioXSerial){
            return res.status(400).send("¡El serial ingresado pertenece a otro equipo!");
        }

        let inventario = new Inventario();
    
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.marca = req.body.marca._id;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.put('/:inventarioId', async function(req, res) {

    try {

        const validaciones = validarInventario(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let inventario = await Inventario.findById(req.params.inventarioId);

        if (!inventario){
            return res.status(404).send("¡No existe el inventario!");
        }

        const existeInventarioXSerial = await Inventario
            .findOne({serial: req.body.serial, _id: {$ne: inventario._id}});

        if (existeInventarioXSerial){
            return res.status(400).send("¡El serial ingresado pertenece a otro equipo!");
        }
    
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.marca = req.body.marca._id;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();

        res.send(inventario);
        
     } catch (error) {
         console.log(error); 
         res.status(500).send("¡Ocurrió un error en el servidor!");
     }
})

router.get('/:inventarioId', async function(req, res) {

    try {

        const inventario = await Inventario.findById(req.params.inventarioId).populate([
            {
                path: 'usuario', select: 'nombre email estado'
            },
            {
                path: 'marca', select: 'nombre estado'
            },
            {
                path: 'tipoEquipo', select: 'nombre estado'
            },
            {
                path: 'estadoEquipo', select: 'nombre estado'
            } 
        ]);

        if (!inventario) {
            return res.status(404).send("¡El inventario no existe!");
        }

        res.send(inventario);

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.delete('/:inventarioId', async function(req, res) {
    try {

        const inventario = await Inventario.findByIdAndDelete(req.params.inventarioId);
        
        if (!inventario) {
            return res.status(404).send("¡El inventario no existe!");
        }

        res.send("¡El inventario fue eliminado con éxito!");

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

module.exports = router;
