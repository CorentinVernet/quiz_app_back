type GameErrorType = "GAME_NOT_FOUND" | "GAME_ALREADY_EXISTS";

class GameError extends Error {
  public errorType: GameErrorType;

  constructor(errorType: GameErrorType) {
    super("");
    this.errorType = errorType;
  }
}

export default GameError;
