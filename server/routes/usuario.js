const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/', (req, res) => {
    res.json('Hola Mundo');
});

app.get('/usuario', (req, res) => {
    // res.json('get Usuario LOCAL');



    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });
        });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({ // Crea nueva instancia del esquema Usuario.
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // Encriptar la constraseña y la cantidad de vueltas que queremos dar.
        role: body.role,
        google: body.google

    });

    // Para grabar en la DB
    usuario.save((err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null // No mostrar la password en la respuesta.

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); // Traemos sólo las propiedades o campos que queremos actualizar

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDBcls

        });
    })
});

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
            estado: false // Le mando el campo estado que es el que voy a cambiar.
        }
        // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

});

module.exports = app;