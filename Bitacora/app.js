const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config({ path: "./.env" });

const app = express();
const port = 3000;

// configuración de base de datos
const bd = mysql.createConnection({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
});

bd.connect((error) => {
  if (error) {
    console.log("Error de conexión a la base de datos: " + error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Para que se vea el CSS
app.use("/css", express.static(path.join(__dirname, "css")));

// vistas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Rutas
// Ruta para mostrar formulario y lista de registros
app.get("/", (req, res) => {
  const query = "SELECT * FROM bitacora ORDER BY fecha_hora DESC";
  bd.query(query, (error, resultados) => {
    if (error) {
      console.log("Error al obtener los registros: " + error);
      return res.render("index", {
        registros: [],
        mensaje: { tipo: "error", texto: "Error al cargar los registros" },
      });
    }
    res.render("index", { registros: resultados });
  });
});

// Ruta para crear un registro
app.post("/bitacora", (req, res) => {
  const {
    fecha_hora,
    area_sector,
    punto_control,
    estado,
    observaciones,
    seguimiento_requerido,
    inspector_operador,
  } = req.body;

  if (
    !fecha_hora ||
    !area_sector ||
    !punto_control ||
    !estado ||
    !seguimiento_requerido ||
    !inspector_operador
  ) {
    const query = "SELECT * FROM bitacora ORDER BY fecha_hora DESC";
    bd.query(query, (error, resultados) => {
      if (error) {
        console.log("Error al obtener los registros: " + error);
        return res.render("index", {
          registros: [],
          mensaje: { tipo: "error", texto: "Error al cargar los registros" },
        });
      }
      return res.render("index", {
        registros: resultados,
        mensaje: {
          tipo: "error",
          texto: "Todos los campos obligatorios deben ser completados",
        },
      });
    });
    return;
  }

  const query = `INSERT INTO bitacora 
    (fecha_hora, area_sector, punto_control, estado, observaciones, seguimiento_requerido, inspector_operador) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  bd.query(
    query,
    [
      fecha_hora,
      area_sector,
      punto_control,
      estado,
      observaciones,
      seguimiento_requerido,
      inspector_operador,
    ],
    (error, resultados) => {
      if (error) {
        console.log("Error al crear el registro: " + error);
        const query = "SELECT * FROM bitacora ORDER BY fecha_hora DESC";
        bd.query(query, (error, resultados) => {
          if (error) {
            console.log("Error al obtener los registros: " + error);
            return res.render("index", {
              registros: [],
              mensaje: {
                tipo: "error",
                texto: "Error al cargar los registros",
              },
            });
          }
          return res.render("index", {
            registros: resultados,
            mensaje: { tipo: "error", texto: "Error al crear el registro" },
          });
        });
      } else {
        res.redirect("/");
      }
    }
  );
});

// Ruta para eliminar registro
app.get("/bitacora/delete/:id", (req, res) => {
  const registroId = req.params.id;

  if (isNaN(registroId)) {
    return res.redirect("/");
  }

  const query = "DELETE FROM bitacora WHERE id = ?";
  bd.query(query, [registroId], (error, resultado) => {
    if (error) {
      console.log("Error al eliminar el registro: " + error);
      const query = "SELECT * FROM bitacora ORDER BY fecha_hora DESC";
      bd.query(query, (error, resultados) => {
        if (error) {
          console.log("Error al obtener los registros: " + error);
          return res.render("index", {
            registros: [],
            mensaje: { tipo: "error", texto: "Error al cargar los registros" },
          });
        }
        return res.render("index", {
          registros: resultados,
          mensaje: { tipo: "error", texto: "Error al eliminar el registro" },
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

// Ruta para buscar y mostrar formulario de edición
app.get("/bitacora/edit/:id", (req, res) => {
  const registroId = req.params.id;

  if (isNaN(registroId)) {
    return res.redirect("/");
  }

  const query = "SELECT * FROM bitacora WHERE id = ?";
  bd.query(query, [registroId], (error, resultado) => {
    if (error) {
      console.log("Error al obtener el registro: " + error);
      return res.redirect("/");
    }

    if (resultado.length === 0) {
      return res.redirect("/");
    }

    res.render("edit", { registro: resultado[0] });
  });
});

// Ruta para actualizar registro
app.post("/bitacora/update/:id", (req, res) => {
  const registroId = req.params.id;
  const {
    fecha_hora,
    area_sector,
    punto_control,
    estado,
    observaciones,
    seguimiento_requerido,
    inspector_operador,
  } = req.body;

  if (isNaN(registroId)) {
    return res.redirect("/");
  }

  // Validación de datos
  if (
    !fecha_hora ||
    !area_sector ||
    !punto_control ||
    !estado ||
    !seguimiento_requerido ||
    !inspector_operador
  ) {
    const query = "SELECT * FROM bitacora WHERE id = ?";
    bd.query(query, [registroId], (error, resultado) => {
      if (error) {
        console.log("Error al obtener el registro: " + error);
        return res.redirect("/");
      }

      if (resultado.length === 0) {
        return res.redirect("/");
      }

      return res.render("edit", {
        registro: resultado[0],
        mensaje: {
          tipo: "error",
          texto: "Todos los campos obligatorios deben ser completados",
        },
      });
    });
    return;
  }

  const query = `UPDATE bitacora SET 
    fecha_hora = ?, 
    area_sector = ?, 
    punto_control = ?, 
    estado = ?, 
    observaciones = ?, 
    seguimiento_requerido = ?, 
    inspector_operador = ? 
    WHERE id = ?`;

  bd.query(
    query,
    [
      fecha_hora,
      area_sector,
      punto_control,
      estado,
      observaciones,
      seguimiento_requerido,
      inspector_operador,
      registroId,
    ],
    (error, resultado) => {
      if (error) {
        console.log("Error al actualizar: " + error);
        const query = "SELECT * FROM bitacora WHERE id = ?";
        bd.query(query, [registroId], (error, resultado) => {
          if (error) {
            console.log("Error al obtener el registro: " + error);
            return res.redirect("/");
          }

          if (resultado.length === 0) {
            return res.redirect("/");
          }

          return res.render("edit", {
            registro: resultado[0],
            mensaje: {
              tipo: "error",
              texto: "Error al actualizar el registro",
            },
          });
        });
      } else {
        res.redirect("/");
      }
    }
  );
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
