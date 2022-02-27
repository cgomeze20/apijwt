const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//Crear el server.
const app = express();

//conection Base de datos
dbConnection();

//Cors
app.use(cors());

//directorio publico
app.use(express.static("public"));

//Leer el body
app.use(express.json());

//Rutas
//TODO: auth, login, renew
app.use("/api/auth", require("./routes/auth"));
//TODO: events crear, read, update, delete
app.use("/api/events", require("./routes/events"));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
