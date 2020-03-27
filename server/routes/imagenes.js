// Esta ruta permite mostrar la imagen por defecto

const express = require('express');

const fs = require('fs');

const path = require('path');

const { verificaTokenImg } = require('../middlewares/autenticacion');

let app = express();


app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);

    // Si existe el path y la imagen, esta se muestra
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        // Enviar imagen por defecto.
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }
});

module.exports = app;