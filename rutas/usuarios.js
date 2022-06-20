const {Router} = require('express');
const Usuario = require('../modelos/Usuario');
const {validarUsuario} = require('../helpers/validar-usuario');
const router = Router();

router.get('/', async function(req, res) {

    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
    
});

router.post('/', async function(req, res) {

    try {

        const validaciones = validarUsuario(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        
        if (existeUsuario) {
            return res.status(400).send("¡El email ingresado ya existe!");
        }
        
        let usuario = new Usuario();

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('¡Ocurrió un error!');
    }
});

router.put('/:usuarioId', async function(req, res) {

    try {
        
        const validaciones = validarUsuario(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        let usuario = await Usuario.findById(req.params.usuarioId);

        if (!usuario){
            return res.status(400).send("¡No existe el usuario!");
        }

        const existeUsuarioXEmail = await Usuario
            .findOne({email: req.body.email, _id: {$ne: usuario._id} });

        if (existeUsuarioXEmail ){
            return res.status(400).send("¡El Email ingresado pertenece a otro usuario!");
        }
    
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();

        res.send(usuario);
        
     } catch (error) {
         console.log(error); 
         res.status(500).send("¡Ocurrió un error en el servidor!");
     }
});

router.get('/:usuarioId', async function(req, res) {

    try {

        const usuario = await Usuario.findById(req.params.usuarioId);

        if (!usuario) {
            return res.status(404).send("¡No existe el usuario!");
        }

        res.send(usuario);

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});

router.delete('/:usuarioId', async function(req, res) {
    try {

        const usuario = await Usuario.findByIdAndDelete(req.params.usuarioId);
        
        if (!usuario) {
            return res.status(404).send("¡El usuario no existe!");
        }

        res.send("¡El usuario fue eliminado con éxito!");

    } catch (error) {
        console.log(error); 
        res.status(500).send("¡Ocurrió un error en el servidor!");
    }
});


module.exports = router;