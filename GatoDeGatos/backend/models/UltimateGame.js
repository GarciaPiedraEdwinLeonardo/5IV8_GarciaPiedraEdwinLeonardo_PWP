const db = require("../config/database");

class UltimateGame {
  static async create(gameData) {
    const {
      player_x,
      player_o,
      winner = null,
      current_player = "X",
      next_board = null,
      game_state,
      moves_history,
    } = gameData;

    const result = await db.insert("ultimate_games", {
      player_x,
      player_o,
      winner,
      current_player,
      next_board,
      game_state: JSON.stringify(game_state),
      moves_history: JSON.stringify(moves_history || []),
      ended_at: winner ? new Date() : null,
    });

    return result;
  }

  static async findAll(limit = 50) {
    try {
      // Asegurar que limit sea un número
      const limitNumber = parseInt(limit) || 50;

      // Usar template string para LIMIT en lugar de parámetro preparado
      const sql = `
      SELECT 
        id,
        player_x,
        player_o,
        winner,
        current_player,
        next_board,
        game_state,
        moves_history,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') as created_at,
        DATE_FORMAT(ended_at, '%Y-%m-%d %H:%i:%s') as ended_at,
        TIMESTAMPDIFF(SECOND, created_at, COALESCE(ended_at, NOW())) as duration_seconds
      FROM ultimate_games 
      ORDER BY created_at DESC 
      LIMIT ${limitNumber}
    `;

      // Ejecutar sin parámetros
      const rows = await db.query(sql);

      // Asegurar que siempre devolvemos un array
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error("Error en findAll:", error);
      return []; // Devolver array vacío en lugar de lanzar error
    }
  }

  static async findById(id) {
    const sql = `
            SELECT 
                id,
                player_x,
                player_o,
                winner,
                current_player,
                next_board,
                game_state,
                moves_history,
                created_at,
                ended_at
            FROM ultimate_games 
            WHERE id = ?
        `;

    return await db.queryOne(sql, [id]);
  }

  static async update(id, gameData) {
    const updateData = {};

    if (gameData.winner !== undefined) {
      updateData.winner = gameData.winner;
      updateData.ended_at = new Date();
    }

    if (gameData.current_player !== undefined) {
      updateData.current_player = gameData.current_player;
    }

    if (gameData.next_board !== undefined) {
      updateData.next_board = gameData.next_board;
    }

    if (gameData.game_state !== undefined) {
      updateData.game_state = JSON.stringify(gameData.game_state);
    }

    if (gameData.moves_history !== undefined) {
      updateData.moves_history = JSON.stringify(gameData.moves_history);
    }

    if (Object.keys(updateData).length > 0) {
      await db.update("ultimate_games", id, updateData);
    }

    return await this.findById(id);
  }

  static async delete(id) {
    await db.delete("ultimate_games", id);
    return true;
  }

  static async getStats() {
    const sql = `
            SELECT 
                COUNT(*) as total_games,
                SUM(CASE WHEN winner = 'X' THEN 1 ELSE 0 END) as x_wins,
                SUM(CASE WHEN winner = 'O' THEN 1 ELSE 0 END) as o_wins,
                SUM(CASE WHEN winner = 'draw' THEN 1 ELSE 0 END) as draws,
                SUM(CASE WHEN winner IS NULL THEN 1 ELSE 0 END) as in_progress
            FROM ultimate_games
        `;

    const [stats] = await db.query(sql);
    return stats;
  }

  static async getPlayerStats(playerName) {
    const sql = `
            SELECT 
                COUNT(*) as total_games,
                SUM(CASE WHEN winner = 'X' AND player_x = ? THEN 1 
                         WHEN winner = 'O' AND player_o = ? THEN 1 
                         ELSE 0 END) as wins,
                SUM(CASE WHEN winner = 'draw' AND (player_x = ? OR player_o = ?) THEN 1 ELSE 0 END) as draws,
                SUM(CASE WHEN winner = 'X' AND player_o = ? THEN 1 
                         WHEN winner = 'O' AND player_x = ? THEN 1 
                         ELSE 0 END) as losses
            FROM ultimate_games
            WHERE player_x = ? OR player_o = ?
        `;

    const [stats] = await db.query(sql, [
      playerName,
      playerName, // wins
      playerName,
      playerName, // draws
      playerName,
      playerName, // losses
      playerName,
      playerName, // where clause
    ]);

    return stats;
  }

  static async getRecentGames(playerName = null, limit = 10) {
    try {
      // Asegurar que limit sea un número
      const limitNumber = parseInt(limit) || 10;

      let sql = `
            SELECT 
                id,
                player_x,
                player_o,
                winner,
                DATE_FORMAT(created_at, '%d/%m/%Y %H:%i') as formatted_date,
                CASE 
                    WHEN winner = 'X' THEN player_x
                    WHEN winner = 'O' THEN player_o
                    ELSE 'Empate'
                END as winner_name
            FROM ultimate_games
            WHERE 1=1
        `;

      const params = [];

      if (playerName) {
        sql += ` AND (player_x = ? OR player_o = ?)`;
        params.push(playerName, playerName);
      }

      sql += ` ORDER BY created_at DESC LIMIT ?`;
      params.push(limitNumber);

      const rows = await db.query(sql, params);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error("Error en getRecentGames:", error);
      return [];
    }
  }
}

module.exports = UltimateGame;
