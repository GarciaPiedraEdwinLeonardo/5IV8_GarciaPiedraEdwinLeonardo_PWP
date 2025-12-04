const express = require("express");
const router = express.Router();
const UltimateGame = require("../models/UltimateGame");

// Obtener todas las partidas
router.get("/games", async (req, res) => {
  try {
    // Asegurar que limit sea un número
    const limit = parseInt(req.query.limit) || 50;
    const games = await UltimateGame.findAll(limit);

    res.json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.error("Error obteniendo partidas:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Obtener una partida por ID
router.get("/games/:id", async (req, res) => {
  try {
    const game = await UltimateGame.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        error: "Partida no encontrada",
      });
    }

    // Parsear JSON strings
    game.game_state = game.game_state ? JSON.parse(game.game_state) : null;
    game.moves_history = game.moves_history
      ? JSON.parse(game.moves_history)
      : [];

    res.json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error obteniendo partida:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Crear nueva partida
router.post("/games", async (req, res) => {
  try {
    const requiredFields = ["player_x", "player_o", "game_state"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          error: `El campo ${field} es requerido`,
        });
      }
    }

    const gameData = {
      player_x: req.body.player_x,
      player_o: req.body.player_o,
      winner: req.body.winner || null,
      current_player: req.body.current_player || "X",
      next_board: req.body.next_board || null,
      game_state: req.body.game_state,
      moves_history: req.body.moves_history || [],
    };

    const newGame = await UltimateGame.create(gameData);

    // Parsear JSON strings para la respuesta
    newGame.game_state = JSON.parse(newGame.game_state);
    newGame.moves_history = JSON.parse(newGame.moves_history);

    res.status(201).json({
      success: true,
      message: "Partida creada exitosamente",
      data: newGame,
    });
  } catch (error) {
    console.error("Error creando partida:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Actualizar partida
router.put("/games/:id", async (req, res) => {
  try {
    const game = await UltimateGame.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        error: "Partida no encontrada",
      });
    }

    const updatedGame = await UltimateGame.update(req.params.id, req.body);

    // Parsear JSON strings para la respuesta
    if (updatedGame.game_state) {
      updatedGame.game_state = JSON.parse(updatedGame.game_state);
    }
    if (updatedGame.moves_history) {
      updatedGame.moves_history = JSON.parse(updatedGame.moves_history);
    }

    res.json({
      success: true,
      message: "Partida actualizada exitosamente",
      data: updatedGame,
    });
  } catch (error) {
    console.error("Error actualizando partida:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Eliminar partida
router.delete("/games/:id", async (req, res) => {
  try {
    const game = await UltimateGame.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        error: "Partida no encontrada",
      });
    }

    await UltimateGame.delete(req.params.id);

    res.json({
      success: true,
      message: "Partida eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error eliminando partida:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Obtener estadísticas
router.get("/stats", async (req, res) => {
  try {
    const stats = await UltimateGame.getStats();

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Obtener estadísticas de jugador
router.get("/stats/player/:name", async (req, res) => {
  try {
    const playerName = req.params.name;
    const stats = await UltimateGame.getPlayerStats(playerName);

    res.json({
      success: true,
      data: {
        player_name: playerName,
        ...stats,
      },
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas del jugador:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Obtener partidas recientes (SIN parámetro)
router.get("/games/recent", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const games = await UltimateGame.getRecentGames(null, limit);

    res.json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.error("Error obteniendo partidas recientes:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

// Obtener partidas recientes de un jugador específico
router.get("/games/recent/:player", async (req, res) => {
  try {
    const playerName = req.params.player;
    const limit = parseInt(req.query.limit) || 10;

    const games = await UltimateGame.getRecentGames(playerName, limit);

    res.json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.error("Error obteniendo partidas recientes:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
});

module.exports = router;
