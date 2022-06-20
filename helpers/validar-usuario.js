const validarUsuario = (req) => {
    const validaciones = [];

    if(!req.body.nombre){
        validaciones.push("¡El nombre es requerido!")
    }

    if(!req.body.email){
        validaciones.push("¡El email es requerido!")
    }

    if(!req.body.estado){
        validaciones.push("¡El estado es requerido!")
    }

    return validaciones;
}

module.exports = {
    validarUsuario,
}