//========================================
// Puerto
//========================================

process.env.PORT = process.env.PORT || 3000;

//========================================
// Entorno
//========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//========================================
// Base de Datos
//========================================

let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
urlDB = 'mongodb+srv://yamilucles85:HESmpGLa0kzkeDzZ@cluster0-h6yer.mongodb.net/cafe'; //'mongodb://yamilucles85:HESmpGLa0kzkeDzZ@cluster0-h6yer.mongodb.net/cafe';
// }

process.env.URLDB = urlDB;