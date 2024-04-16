//servidor 
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';




//const express = require('express'); 
const app = express();


// Conectar la base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error));

// Definir puerto
const port = process.env.PORT || 3000;

//habilitar pug
app.set('view engine', 'pug');

//obtener el año actual
//req- lo que se envia al servidor - res lo que el servidor me envia - next- pasar al siguiente middleware
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    return next();
})


// Habilitar express.json
app.use(express.urlencoded({ extended: false }));


//public folder
app.use(express.static('public'));

//agregar el router
app.use('/', router);

app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})