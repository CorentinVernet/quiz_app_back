type AccuracyErrorType =
  | "MISSING_ID"
  | "MISSING_USER_ID"
  | "ACCURACY_NOT_FOUND"
  | "ACCURACY_ALREADY_EXISTS"
  | "MISSING_ROUND_ID_OR_GAME_ID";

class AccuracyError extends Error {
  public errorType: AccuracyErrorType;

  constructor(errorType: AccuracyErrorType) {
    super("");
    this.errorType = errorType;
  }
}

export default AccuracyError;
