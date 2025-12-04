CREATE DATABASE IF NOT EXISTS ultimate_gato;
USE ultimate_gato;

CREATE TABLE IF NOT EXISTS ultimate_games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_x VARCHAR(50) NOT NULL,
    player_o VARCHAR(50) NOT NULL,
    winner VARCHAR(10),
    current_player CHAR(1) DEFAULT 'X',
    next_board INT,
    game_state TEXT,
    moves_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NULL
);

-- Tabla para estadísticas simples
CREATE TABLE IF NOT EXISTS game_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(50) NOT NULL,
    total_games INT DEFAULT 0,
    wins INT DEFAULT 0,
    draws INT DEFAULT 0,
    UNIQUE(player_name)
);