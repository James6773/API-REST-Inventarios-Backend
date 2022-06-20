const express = require('express');
const {getConnection} = require('./db/db-connection-mongo');
const cors = require('cors');
const app = express();
const helmet = require("helmet")
require('dotenv').config();

const port = process.env.PORT;

getConnection();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  )

app.use('/estado-equipo', require('./rutas/estadoEquipos'));
app.use('/inventario', require('./rutas/inventarios'));
app.use('/marca', require('./rutas/marcas'));
app.use('/tipo-equipo', require('./rutas/tipoEquipos'));
app.use('/usuario', require('./rutas/usuarios'));

app.listen(port, () => {
    console.log(`¡Aplicación corriendo en el puerto ${port}!`);
});