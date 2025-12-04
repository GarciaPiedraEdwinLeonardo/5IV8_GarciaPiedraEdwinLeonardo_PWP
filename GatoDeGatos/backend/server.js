const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

// Importar rutas y base de datos
const apiRoutes = require("./routes/api");
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Rutas de la API
app.use("/api", apiRoutes);

// Ruta principal - servir el frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Ruta para el favicon
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/favicon.ico"));
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // La conexión a la base de datos ya se inicializa automáticamente
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`API disponible en http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("Error iniciando el servidor:", error);
    process.exit(1);
  }
};

// Manejar cierre limpio
process.on("SIGINT", async () => {
  await db.close();
  console.log("\nServidor detenido");
  process.exit(0);
});

startServer();
