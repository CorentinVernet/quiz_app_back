type RoundErrorType =
  | "ROUND_NOT_FOUND"
  | "ROUND_ALREADY_EXISTS"
  | "MISSING_GAME_ID"
  | "MISSING_THEME";

class RoundError extends Error {
  public errorType: RoundErrorType;

  constructor(errorType: RoundErrorType) {
    super("");
    this.errorType = errorType;
  }
}

export default RoundError;
