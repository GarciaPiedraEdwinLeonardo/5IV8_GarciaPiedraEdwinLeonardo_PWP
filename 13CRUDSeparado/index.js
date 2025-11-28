const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const app = express();
const db = require('./database/db.js');

// Configurar vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(cors());

// Página de bienvenida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bienvenida.html'));
});

// Ruta correcta para ver los cursos
app.get('/vista/cursos-ejs', (req, res) => {

    db.query('SELECT * FROM cursos', (error, resultado) => {

        if (error) {
            console.error('Error al obtener los cursos: ' + error.message);
            return res.render('cursos', { cursos: [] });
        }

        // Renderizar vista cursos.ejs con los datos
        res.render('cursos', { cursos: resultado });
    });

});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
