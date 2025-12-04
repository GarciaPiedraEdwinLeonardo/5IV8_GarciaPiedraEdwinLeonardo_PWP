class GameAPI {
  constructor(baseURL = "http://localhost:3000/api") {
    this.baseURL = baseURL;
  }

  async fetch(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en la petición:", error);
      throw error;
    }
  }

  // Métodos para partidas
  async getGames(limit = 50) {
    return this.fetch(`/games?limit=${limit}`);
  }

  async getGame(id) {
    return this.fetch(`/games/${id}`);
  }

  async saveGame(gameData) {
    return this.fetch("/games", {
      method: "POST",
      body: JSON.stringify(gameData),
    });
  }

  async updateGame(id, gameData) {
    return this.fetch(`/games/${id}`, {
      method: "PUT",
      body: JSON.stringify(gameData),
    });
  }

  async deleteGame(id) {
    return this.fetch(`/games/${id}`, {
      method: "DELETE",
    });
  }

  // Métodos para estadísticas
  async getStats() {
    return this.fetch("/stats");
  }

  async getPlayerStats(playerName) {
    return this.fetch(`/stats/player/${encodeURIComponent(playerName)}`);
  }

  async getRecentGames(playerName = null, limit = 10) {
    const endpoint = playerName
      ? `/games/recent/${encodeURIComponent(playerName)}?limit=${limit}`
      : `/games/recent?limit=${limit}`;
    return this.fetch(endpoint);
  }
}

// Utilidades del DOM
class DOMUtils {
  static createElement(tag, className, textContent = "", attributes = {}) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (textContent) {
      element.textContent = textContent;
    }

    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }

    return element;
  }

  static showNotification(message, type = "info", duration = 3000) {
    // Eliminar notificaciones previas
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    // Crear nueva notificación
    const notification = this.createElement("div", "notification");
    notification.textContent = message;

    // Estilos según tipo
    const typeStyles = {
      success: { background: "#4CAF50", color: "white" },
      error: { background: "#f44336", color: "white" },
      warning: { background: "#ff9800", color: "white" },
      info: { background: "#2196F3", color: "white" },
    };

    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "15px 25px",
      borderRadius: "5px",
      zIndex: "1000",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      animation: "slideIn 0.3s ease-out",
      ...typeStyles[type],
    });

    document.body.appendChild(notification);

    // Auto-eliminar después de la duración
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  static toggleLoading(show, elementId = null) {
    let targetElement;

    if (elementId) {
      targetElement = document.getElementById(elementId);
    } else {
      // Crear overlay global si no existe
      let overlay = document.getElementById("loadingOverlay");
      if (!overlay) {
        overlay = this.createElement("div", "loading-overlay");
        overlay.id = "loadingOverlay";
        overlay.innerHTML = '<div class="spinner"></div>';

        Object.assign(overlay.style, {
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "9999",
        });

        const spinner = overlay.querySelector(".spinner");
        Object.assign(spinner.style, {
          width: "50px",
          height: "50px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #6a11cb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        });

        document.body.appendChild(overlay);
      }

      targetElement = overlay;
    }

    if (targetElement) {
      targetElement.style.display = show ? "flex" : "none";
    }
  }

  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  static formatDuration(seconds) {
    if (!seconds) return "-";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  }

  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Animaciones CSS adicionales
const addAnimations = () => {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .winning-combo {
            animation: bounce 0.5s ease infinite;
        }
        
        .new-game {
            animation: fadeIn 0.5s ease-out;
        }
    `;
  document.head.appendChild(style);
};

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  addAnimations();

  // Configurar API global
  window.gameAPI = new GameAPI();
  window.domUtils = DOMUtils;

  // Configurar botones globales
  const setupGlobalButtons = () => {
    // Botón de ayuda
    const helpBtn = document.getElementById("helpBtn");
    if (helpBtn) {
      helpBtn.addEventListener("click", () => {
        DOMUtils.showNotification(
          "Haz clic en una celda para jugar. Gana 3 tableros pequeños en línea para ganar el juego completo.",
          "info",
          5000
        );
      });
    }

    // Botón de sonido
    const soundBtn = document.getElementById("soundBtn");
    if (soundBtn) {
      let soundEnabled = true;

      soundBtn.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        soundBtn.innerHTML = soundEnabled
          ? '<i class="fas fa-volume-up"></i> Sonido ON'
          : '<i class="fas fa-volume-mute"></i> Sonido OFF';

        DOMUtils.showNotification(
          soundEnabled ? "Sonido activado" : "Sonido desactivado",
          "info"
        );
      });
    }

    // Botón de tema
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
      let darkMode = false;

      themeBtn.addEventListener("click", () => {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);

        themeBtn.innerHTML = darkMode
          ? '<i class="fas fa-sun"></i> Modo Claro'
          : '<i class="fas fa-moon"></i> Modo Oscuro';

        DOMUtils.showNotification(
          darkMode ? "Modo oscuro activado" : "Modo claro activado",
          "info"
        );
      });
    }
  };

  setupGlobalButtons();

  // Estilos para modo oscuro
  const darkModeStyles = document.createElement("style");
  darkModeStyles.textContent = `
        body.dark-mode {
            background: linear-gradient(135deg, #121212 0%, #2c3e50 100%);
            color: #f0f0f0;
        }
        
        body.dark-mode .container {
            background: #1e1e1e;
        }
        
        body.dark-mode .player-card,
        body.dark-mode .info-box,
        body.dark-mode .history-item,
        body.dark-mode .stat-item {
            background: #2c2c2c;
            color: #f0f0f0;
        }
        
        body.dark-mode .small-board {
            background: #2c2c2c;
        }
        
        body.dark-mode .small-cell {
            background: #3c3c3c;
            color: #f0f0f0;
        }
        
        body.dark-mode .small-cell:hover {
            background: #4c4c4c;
        }
    `;
  document.head.appendChild(darkModeStyles);
});

// Funciones de utilidad para el juego
const GameUtils = {
  // Determinar si una celda está en una posición de esquina
  isCornerCell: (index) => [0, 2, 6, 8].includes(index),

  // Determinar si una celda está en el centro
  isCenterCell: (index) => index === 4,

  // Determinar si una celda está en un borde
  isEdgeCell: (index) => [1, 3, 5, 7].includes(index),

  // Convertir índice de tablero a coordenadas
  indexToCoords: (index) => ({
    row: Math.floor(index / 3),
    col: index % 3,
  }),

  // Convertir coordenadas a índice
  coordsToIndex: (row, col) => row * 3 + col,

  // Obtener tableros adyacentes
  getAdjacentBoards: (boardIndex) => {
    const coords = GameUtils.indexToCoords(boardIndex);
    const adjacents = [];

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;

        const newRow = coords.row + dr;
        const newCol = coords.col + dc;

        if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
          adjacents.push(GameUtils.coordsToIndex(newRow, newCol));
        }
      }
    }

    return adjacents;
  },

  // Calcular puntuación heurística de una posición
  calculateBoardScore: (board, player) => {
    let score = 0;
    const opponent = player === "X" ? "O" : "X";

    // Combinaciones ganadoras
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      const cells = [board[a], board[b], board[c]];

      const playerCount = cells.filter((cell) => cell === player).length;
      const opponentCount = cells.filter((cell) => cell === opponent).length;

      if (playerCount === 3) score += 100;
      else if (playerCount === 2 && opponentCount === 0) score += 10;
      else if (playerCount === 1 && opponentCount === 0) score += 1;

      if (opponentCount === 2 && playerCount === 0) score -= 10;
      else if (opponentCount === 1 && playerCount === 0) score -= 1;
    }

    return score;
  },

  // Generar un movimiento aleatorio válido
  getRandomMove: (boards, boardWinners, nextBoard) => {
    const availableBoards =
      nextBoard === null
        ? boards
            .map((_, index) => (boardWinners[index] === "" ? index : -1))
            .filter((i) => i !== -1)
        : [nextBoard];

    if (availableBoards.length === 0) return null;

    const boardIndex =
      availableBoards[Math.floor(Math.random() * availableBoards.length)];
    const availableCells = boards[boardIndex]
      .map((cell, index) =>
        cell === "" && !boardWinners[boardIndex] ? index : -1
      )
      .filter((i) => i !== -1);

    if (availableCells.length === 0) return null;

    const cellIndex =
      availableCells[Math.floor(Math.random() * availableCells.length)];

    return { boardIndex, cellIndex };
  },

  // Validar si un movimiento es válido
  isValidMove: (boards, boardWinners, nextBoard, boardIndex, cellIndex) => {
    if (boardIndex < 0 || boardIndex >= 9 || cellIndex < 0 || cellIndex >= 9)
      return false;
    if (boards[boardIndex][cellIndex] !== "") return false;
    if (boardWinners[boardIndex] !== "") return false;
    if (nextBoard !== null && nextBoard !== boardIndex) return false;
    return true;
  },

  // Crear un efecto visual para un movimiento
  animateMove: (element, player) => {
    if (!element) return;

    element.classList.add("animated-move");
    element.style.animation = "bounce 0.3s ease";

    setTimeout(() => {
      element.style.animation = "";
      element.classList.remove("animated-move");
    }, 300);
  },
};

// Exportar utilidades globalmente
window.GameUtils = GameUtils;
