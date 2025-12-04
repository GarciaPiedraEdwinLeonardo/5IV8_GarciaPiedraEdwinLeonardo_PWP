class UltimateTicTacToe {
  constructor() {
    this.boards = Array(9)
      .fill()
      .map(() => Array(9).fill(""));
    this.boardWinners = Array(9).fill("");
    this.currentPlayer = "X";
    this.nextBoard = null;
    this.gameOver = false;
    this.winner = "";
    this.movesHistory = [];
    this.playerXName = "Felix";
    this.playerOName = "Luna";

    this.init();
  }

  init() {
    this.loadPlayersFromUI();
    this.renderUltimateBoard();
    this.updateGameStatus();
    this.setupEventListeners();
    this.loadGameHistory();
  }

  loadPlayersFromUI() {
    const playerXInput = document.getElementById("playerXName");
    const playerOInput = document.getElementById("playerOName");

    if (playerXInput && playerXInput.value) {
      this.playerXName = playerXInput.value;
    }
    if (playerOInput && playerOInput.value) {
      this.playerOName = playerOInput.value;
    }
  }

  renderUltimateBoard() {
    const ultimateBoard = document.getElementById("ultimateBoard");
    ultimateBoard.innerHTML = "";

    for (let boardIndex = 0; boardIndex < 9; boardIndex++) {
      const smallBoard = document.createElement("div");
      smallBoard.className = "small-board";
      smallBoard.dataset.boardIndex = boardIndex;

      if (
        this.nextBoard === boardIndex ||
        (this.nextBoard === null && !this.gameOver)
      ) {
        smallBoard.classList.add("active");
      }

      // Si el tablero ya tiene ganador, mostrar el símbolo grande
      if (this.boardWinners[boardIndex]) {
        const winnerDiv = document.createElement("div");
        winnerDiv.className = "board-winner";
        winnerDiv.textContent = this.boardWinners[boardIndex];
        winnerDiv.style.color =
          this.boardWinners[boardIndex] === "X" ? "#ff4757" : "#2ed573";
        smallBoard.appendChild(winnerDiv);
        smallBoard.classList.add("won");
      }

      // Crear las 9 celdas del tablero pequeño
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        const cell = document.createElement("div");
        cell.className = "small-cell";
        cell.dataset.boardIndex = boardIndex;
        cell.dataset.cellIndex = cellIndex;

        const value = this.boards[boardIndex][cellIndex];
        if (value) {
          cell.textContent = value;
          cell.classList.add(value.toLowerCase());
        }

        // Solo hacer clicable si el juego no ha terminado y es el tablero activo
        if (
          !this.gameOver &&
          (this.nextBoard === null || this.nextBoard === boardIndex)
        ) {
          cell.addEventListener("click", () =>
            this.makeMove(boardIndex, cellIndex)
          );
        }

        smallBoard.appendChild(cell);
      }

      ultimateBoard.appendChild(smallBoard);
    }
  }

  makeMove(boardIndex, cellIndex) {
    if (this.gameOver) return;

    // Verificar si el movimiento es válido
    if (this.nextBoard !== null && this.nextBoard !== boardIndex) return;
    if (this.boards[boardIndex][cellIndex] !== "") return;
    if (this.boardWinners[boardIndex] !== "") return;

    // Realizar el movimiento
    this.boards[boardIndex][cellIndex] = this.currentPlayer;
    this.movesHistory.push({
      player: this.currentPlayer,
      board: boardIndex,
      cell: cellIndex,
      timestamp: new Date().toISOString(),
    });

    // Verificar si hay ganador en el tablero pequeño
    this.checkBoardWinner(boardIndex);

    // Determinar el siguiente tablero
    this.nextBoard = cellIndex;

    // Si el siguiente tablero ya tiene ganador o está lleno, permitir cualquier tablero
    if (
      this.boardWinners[this.nextBoard] !== "" ||
      this.isBoardFull(this.nextBoard)
    ) {
      this.nextBoard = null;
    }

    // Verificar si hay ganador global
    this.checkGlobalWinner();

    // Cambiar turno si el juego no ha terminado
    if (!this.gameOver) {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    this.renderUltimateBoard();
    this.updateGameStatus();

    // Habilitar botón de guardar
    document.getElementById("saveBtn").disabled = false;
  }

  checkBoardWinner(boardIndex) {
    const board = this.boards[boardIndex];
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.boardWinners[boardIndex] = board[a];

        // Marcar celdas ganadoras
        combo.forEach((index) => {
          const cell = document.querySelector(
            `.small-cell[data-board-index="${boardIndex}"][data-cell-index="${index}"]`
          );
          if (cell) {
            cell.classList.add("winning-cell");
          }
        });
        return;
      }
    }

    // Verificar empate en el tablero pequeño
    if (this.isBoardFull(boardIndex)) {
      this.boardWinners[boardIndex] = "D"; // D de Draw
    }
  }

  checkGlobalWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6], // Diagonales
    ];

    // Convertir 'D' (draw) a vacío para verificar combinaciones ganadoras
    const boardStatus = this.boardWinners.map((winner) =>
      winner === "D" ? "" : winner
    );

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        boardStatus[a] &&
        boardStatus[a] === boardStatus[b] &&
        boardStatus[a] === boardStatus[c]
      ) {
        this.gameOver = true;
        this.winner = boardStatus[a];
        return;
      }
    }

    // Verificar empate global
    if (this.boardWinners.every((winner) => winner !== "")) {
      this.gameOver = true;
      this.winner = "draw";
    }
  }

  isBoardFull(boardIndex) {
    return this.boards[boardIndex].every((cell) => cell !== "");
  }

  updateGameStatus() {
    const gameStatus = document.getElementById("gameStatus");
    const currentTurn = document.getElementById("currentTurn");
    const nextBoardInfo = document.getElementById("nextBoardInfo");
    const playerXStatus = document.getElementById("playerXStatus");
    const playerOStatus = document.getElementById("playerOStatus");

    if (this.gameOver) {
      if (this.winner === "draw") {
        gameStatus.textContent = "¡Empate!";
        gameStatus.style.color = "#f39c12";
      } else {
        const winnerName =
          this.winner === "X" ? this.playerXName : this.playerOName;
        gameStatus.textContent = `¡${winnerName} (${this.winner}) ha ganado!`;
        gameStatus.style.color = this.winner === "X" ? "#ff4757" : "#2ed573";
      }
    } else {
      const currentPlayerName =
        this.currentPlayer === "X" ? this.playerXName : this.playerOName;
      gameStatus.textContent = `Turno de ${currentPlayerName} (${this.currentPlayer})`;
      gameStatus.style.color = "#2c3e50";
    }

    currentTurn.textContent = `${
      this.currentPlayer === "X" ? this.playerXName : this.playerOName
    } (${this.currentPlayer})`;
    currentTurn.style.color =
      this.currentPlayer === "X" ? "#ff4757" : "#2ed573";

    if (this.nextBoard === null) {
      nextBoardInfo.textContent = "Cualquier tablero";
    } else {
      const row = Math.floor(this.nextBoard / 3) + 1;
      const col = (this.nextBoard % 3) + 1;
      nextBoardInfo.textContent = `Tablero ${row},${col}`;
    }

    // Actualizar estados de jugadores
    playerXStatus.textContent =
      this.currentPlayer === "X" ? "JUGANDO" : "ESPERANDO";
    playerXStatus.style.background =
      this.currentPlayer === "X" ? "#d4edda" : "#f8f9fa";
    playerXStatus.style.color =
      this.currentPlayer === "X" ? "#155724" : "#6c757d";

    playerOStatus.textContent =
      this.currentPlayer === "O" ? "JUGANDO" : "ESPERANDO";
    playerOStatus.style.background =
      this.currentPlayer === "O" ? "#d4edda" : "#f8f9fa";
    playerOStatus.style.color =
      this.currentPlayer === "O" ? "#155724" : "#6c757d";
  }

  resetGame() {
    this.boards = Array(9)
      .fill()
      .map(() => Array(9).fill(""));
    this.boardWinners = Array(9).fill("");
    this.currentPlayer = "X";
    this.nextBoard = null;
    this.gameOver = false;
    this.winner = "";
    this.movesHistory = [];

    this.loadPlayersFromUI();
    this.renderUltimateBoard();
    this.updateGameStatus();
    document.getElementById("saveBtn").disabled = true;
  }

  getGameState() {
    return {
      boards: this.boards,
      boardWinners: this.boardWinners,
      currentPlayer: this.currentPlayer,
      nextBoard: this.nextBoard,
      gameOver: this.gameOver,
      winner: this.winner,
      playerXName: this.playerXName,
      playerOName: this.playerOName,
      movesHistory: this.movesHistory,
    };
  }

  setGameState(state) {
    this.boards = state.boards;
    this.boardWinners = state.boardWinners;
    this.currentPlayer = state.currentPlayer;
    this.nextBoard = state.nextBoard;
    this.gameOver = state.gameOver;
    this.winner = state.winner;
    this.playerXName = state.playerXName;
    this.playerOName = state.playerOName;
    this.movesHistory = state.movesHistory || [];

    this.renderUltimateBoard();
    this.updateGameStatus();
    document.getElementById("saveBtn").disabled = false;
  }

  setupEventListeners() {
    document.getElementById("startBtn").addEventListener("click", () => {
      this.loadPlayersFromUI();
      this.resetGame();
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
      if (confirm("¿Estás seguro de que quieres reiniciar el juego?")) {
        this.resetGame();
      }
    });

    document
      .getElementById("saveBtn")
      .addEventListener("click", () => this.saveGame());
    document
      .getElementById("loadBtn")
      .addEventListener("click", () => this.loadGameHistory());

    document.getElementById("rulesBtn").addEventListener("click", () => {
      document.getElementById("rulesModal").style.display = "flex";
    });

    document.querySelector(".close-modal").addEventListener("click", () => {
      document.getElementById("rulesModal").style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === document.getElementById("rulesModal")) {
        document.getElementById("rulesModal").style.display = "none";
      }
    });
  }

  async saveGame() {
    const gameData = {
      player_x: this.playerXName,
      player_o: this.playerOName,
      winner: this.winner || null,
      current_player: this.currentPlayer,
      next_board: this.nextBoard,
      game_state: JSON.stringify(this.getGameState()),
      moves_history: JSON.stringify(this.movesHistory),
    };

    try {
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (response.ok) {
        alert("Partida guardada correctamente");
        this.loadGameHistory();
      } else {
        alert("Error al guardar la partida");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    }
  }

  async loadGameHistory() {
    try {
      const response = await fetch("http://localhost:3000/api/games");
      const result = await response.json();

      // Verifica la estructura de la respuesta
      if (result && result.success && Array.isArray(result.data)) {
        this.displayGameHistory(result.data);
      } else if (Array.isArray(result)) {
        // Si la respuesta es directamente un array (backwards compatibility)
        this.displayGameHistory(result);
      } else {
        console.error("Formato de respuesta inesperado:", result);
        this.displayGameHistory([]);
      }
    } catch (error) {
      console.error("Error:", error);
      this.displayGameHistory([]);
    }
  }

  displayGameHistory(games) {
    const historyList = document.getElementById("historyList");
    const statsGrid = document.getElementById("statsGrid");

    // Limpiar contenido previo
    historyList.innerHTML = "";
    statsGrid.innerHTML = "";

    // Verificar si games es un array válido
    if (!games || !Array.isArray(games)) {
      console.error("games no es un array:", games);
      historyList.innerHTML = `
            <div class="history-error">
                <p>No se pudieron cargar las partidas</p>
                <button onclick="ultimateGame.loadGameHistory()" class="btn-small">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
      return;
    }

    // Mostrar historial si hay partidas
    if (games.length === 0) {
      historyList.innerHTML =
        '<div class="no-games">No hay partidas guardadas aún</div>';
    } else {
      games.slice(0, 10).forEach((game) => {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";

        const winnerText =
          game.winner === "draw"
            ? "Empate"
            : game.winner === "X"
            ? `${game.player_x} (X)`
            : game.winner === "O"
            ? `${game.player_o} (O)`
            : "En curso";

        historyItem.innerHTML = `
                <div class="history-game">
                    <strong>${game.player_x || "Jugador X"} (X) vs ${
          game.player_o || "Jugador O"
        } (O)</strong>
                    <div>Resultado: ${winnerText}</div>
                    <div class="history-date">${
                      game.created_at || "Fecha no disponible"
                    }</div>
                    <button onclick="ultimateGame.loadGame(${
                      game.id
                    })" class="btn-small" ${!game.id ? "disabled" : ""}>
                        <i class="fas fa-undo"></i> Cargar
                    </button>
                </div>
            `;
        historyList.appendChild(historyItem);
      });
    }

    // Calcular estadísticas
    const stats = this.calculateStats(games);
    statsGrid.innerHTML = `
        <div class="stat-item">
            <div>Total Partidas</div>
            <div class="stat-value">${stats.total}</div>
        </div>
        <div class="stat-item">
            <div>Victorias X</div>
            <div class="stat-value">${stats.xWins}</div>
        </div>
        <div class="stat-item">
            <div>Victorias O</div>
            <div class="stat-value">${stats.oWins}</div>
        </div>
        <div class="stat-item">
            <div>Empates</div>
            <div class="stat-value">${stats.draws}</div>
        </div>
    `;
  }

  calculateStats(games) {
    // Asegurar que games sea un array
    if (!Array.isArray(games)) {
      return {
        total: 0,
        xWins: 0,
        oWins: 0,
        draws: 0,
      };
    }

    return {
      total: games.length,
      xWins: games.filter((g) => g && g.winner === "X").length,
      oWins: games.filter((g) => g && g.winner === "O").length,
      draws: games.filter((g) => g && g.winner === "draw").length,
    };
  }

  async loadGame(gameId) {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${gameId}`);
      const result = await response.json();

      if (result && result.success && result.data) {
        const game = result.data;

        if (game && game.game_state) {
          this.setGameState(JSON.parse(game.game_state));
          DOMUtils.showNotification("Partida cargada correctamente", "success");
        } else {
          DOMUtils.showNotification(
            "Error: Datos de partida inválidos",
            "error"
          );
        }
      } else if (result && result.game_state) {
        // Backwards compatibility
        this.setGameState(JSON.parse(result.game_state));
        DOMUtils.showNotification("Partida cargada correctamente", "success");
      } else {
        DOMUtils.showNotification("Error al cargar la partida", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      DOMUtils.showNotification("Error de conexión con el servidor", "error");
    }
  }
}

// Inicializar el juego cuando se cargue la página
let ultimateGame;
window.addEventListener("DOMContentLoaded", () => {
  ultimateGame = new UltimateTicTacToe();
});
