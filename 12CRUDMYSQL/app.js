/*
Vamos a crear un cliente servidor para un crud
Para esto tenemos que probar si el modulo de mysql esta verificado
sino utilizaremos mysql2
*/

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
require('dotenv').config({path: './.env'});

const app = express();
const port = 3000;

//configuracion de mysql
const bd = mysql.createConnection({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
});

bd.connect((error) => {
  if (error) {
    console.log("Error de conexion a la base de datos: " + error);
  } else {
    console.log("Conexion exitosa a la base de datos");
  }
});

//tenemos que configurar nuestro middleware, el cual estaremos usando rutas y codificacion de la informacion por json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//tenemos que configurar las vistas que se van ejecutar
app.set("view engine", "ejs");
//donde se encuentra el directorio de dichas vistas
app.set("views", __dirname + "/views");

//para la carga de imagenes, css, multimedia, etc es necesario configurar una carpeta public, en la cual todos los recursos del proyecto se podran consumir
app.use("/css", express.static(path.join(__dirname, "css")));

//vamos a crear el crud de estudiantes a partir de rutas

//ruta get para mostrar el formulario y la lista de estudiantes
app.get("/", (req, res) => {
  //necesito obtener la lista de estudiantes desde la base de datos
  const querry = "SELECT * FROM estudiantes";
  bd.query(querry, (error, resultados) => {
    if (error) {
      console.log("Error al obtener los estudiantes: " + error);
      res.status(500).send("Error al obtener los estudiantes");
    }
    res.render("index", { estudiantes: resultados });
  });
});

//ruta para crear un estudiante
app.post("/estudiantes", (req, res) => {
  //obtener los parametros del formulario
  const { nombre, edad, curso } = req.body;
  console.log(nombre,edad,curso);
  const querry = `INSERT INTO estudiantes (nombre, edad, curso) VALUES ('${nombre}', '${edad}', '${curso}');`;
  bd.query(querry, (error, resultados) => {
    if (error) {
      console.log("Error al crear el estudiante: " + error);
      res.status(500).send("Error al crear el estudiante");
    }
    res.redirect("/");
  });
});

//ruta para eliminar estudiante
app.get('/estudiantes/delete/:id', (req, res) => {

  const estudianteId = req.params.id;
  const query = `DELETE FROM estudiantes WHERE id = ${estudianteId};`;
  bd.query(query, (error, resultado) => {
    if(error){
      console.log("Error para eliminar el estudiante " + error);
      res.status(500).send("Error al eliminar el estudiantes");
    }

    res.redirect("/");

  })

});

//ruta para buscar y actualizar
app.get('/estudiantes/edit/:id' ,(req,res) => {

  const estudianteId = req.params.id;
  const query = `SELECT * FROM estudiantes WHERE id = ${estudianteId};`

  bd.query(query, (error,resultado) => {
    if(error){
      console.log("Error al obtener el estudiante " + error);
      res.status(500).send("Error al obtener el estudiante");
    }

    res.render('edit', { estudiante : resultado[0] });
  })
});

app.post('/estudiantes/uptade/:id', (req,res) => {
  const estudianteId = req.params.id;
  const { nombre, edad, curso } = req.body;
  console.log(estudianteId, nombre, edad, curso);
  const query = `UPDATE estudiantes SET nombre = '${nombre}', edad = ${edad} , curso = '${curso}' WHERE id = ${estudianteId};`;

  bd.query(query, (error,resultado) => {
    if(error){
      console.log("Error al actualizar " + error);
      res.status(500).send("Error al actualizar el estudiante");
    }

    res.redirect("/");
  })

})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
