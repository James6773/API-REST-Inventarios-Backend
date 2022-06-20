const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        console.log("Inicializando llamado a la base de datos...");
    await mongoose.connect('mongodb://freelancer_app:f7Jhj1E0SHn61dhq@cluster0-shard-00-00.dsqh4.mongodb.net:27017,cluster0-shard-00-01.dsqh4.mongodb.net:27017,cluster0-shard-00-02.dsqh4.mongodb.net:27017/inventarios-youtube?ssl=true&replicaSet=atlas-vl312h-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log("¡Conexión exitosa con la base de datos!");
    } catch(error) {
        console.log("¡Falló la conexión con la base de datos!");
    }
}

module.exports = {
    getConnection,
}