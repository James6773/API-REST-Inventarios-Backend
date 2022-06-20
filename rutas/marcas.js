const {Router} = require('express');
const Marca = require('../modelos/Marca');
const Inventario = require('../modelos/Inventario');
const {validarMarca} = require('../helpers/validar-marca');
const router = Router();


router.get('/', async function(req, res) {
    
    try {
        const marcas = await Marca.find();
        res.send(marcas);
    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.post('/', async function(req, res) {
   
    try {

        const validaciones = validarMarca(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        
        let marca = new Marca();

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('¡Ocurrió un error!');
    }
});

router.put('/:marcaId', async function(req, res) {
    
    try {

        const validaciones = validarMarca(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let marca = await Marca.findById(req.params.marcaId);

        if (!marca){
            return res.status(400).send("¡No existe la marca!");
        }
    
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);
        
     } catch (error) {
         console.log(error); 
         res.status(500).send("¡Ocurrió un error en el servidor!");
     }
});

router.get('/:marcaId', async function(req, res) {
    try {

        const marca = await Marca.findById(req.params.marcaId);

        if (!marca) {
            return res.status(404).send("¡La marca de equipo no existe!");
        }
        res.send(marca);

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.delete('/:marcaId', async function(req, res) {
    try {

        const marca = await Marca.findByIdAndDelete(req.params.marcaId);
        
        if (!marca) {
            return res.status(404).send("¡La marca no existe!");
        }

        const existeMarcaXInventario = await Inventario
        .findOne({marca: req.body.marca, _id: {$ne: Inventario.marca_id} });

        if (existeMarcaXInventario ){
            return res.status(400).send("¡El usuario no se pudo eliminar! Intente primero actualizar o borrar el(los) inventario(s) donde se encuentra vinculado el usuario");
        }

        res.send("¡La marca fue eliminada con éxito!");

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

module.exports = router;