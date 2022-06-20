const validarTipoEquipo = (req) => {
    const validaciones = [];

    if(!req.body.nombre){
        validaciones.push("¡El nombre es requerido!")
    }

    if(!req.body.estado){
        validaciones.push("¡El estado es requerido!")
    }

    return validaciones;
}

module.exports = {
    validarTipoEquipo,
}