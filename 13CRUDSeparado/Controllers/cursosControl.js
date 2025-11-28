// Requerimos la conexión con la base de datos
const dbConection = require('../database/db.js');

// Endpoint para obtener todos los cursos
const getCursos = (req, res) => {
    try {
        dbConection.query('SELECT * FROM cursos', (error, results) => {
            if (error) {
                console.log(error); // Mejor loguear el error aquí antes de retornar
                return res.status(400).json({ message: 'Error al obtener los cursos' });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.log(error); // También logueamos el error del servidor
        res.status(500).json({ message: 'Error del servidor' });
    }
};

// Endpoint para obtener un curso por su ID
const getCursosByid = (req, res) => {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL
    try {
        dbConection.query('SELECT * FROM cursos WHERE id = ?', [id], (error, results) => {
            if (error) {
                console.log(error); // Loguear error aquí
                return res.status(400).json({ message: 'Error al obtener el curso' });
            } else {
                if (results.length > 0) {
                    res.status(200).json(results[0]); // Si hay resultados, devolver el primer curso
                } else {
                    res.status(404).json({ message: 'Curso no encontrado' });
                }
            }
        });
    } catch (error) {
        console.log(error); // Loguear error del servidor
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = { getCursos, getCursosByid };
