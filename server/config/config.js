//========================================
// Puerto
//========================================

process.env.PORT = process.env.PORT || 3000;

//========================================
// Entorno
//========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//========================================
// Vencimiento del Token
//========================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//========================================
// Seed de autenticación
//========================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'; // Crear la variable para Heroku
// heroku config:set SEED="este-es-el-seed-produccion"

//========================================
// Base de Datos
//========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//========================================
// Google Client ID
//========================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '887130341919-nenok2u6mbnni0m1grvmh0i4j9544gef.apps.googleusercontent.com';