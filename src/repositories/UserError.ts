type UserErrorType =
  | "USER_NOT_FOUND"
  | "INVALID_PASSWORD"
  | "MISSING_CREDENTIALS"
  | "USER_ALREADY_EXISTS";

class UserError extends Error {
  public errorType: UserErrorType;

  constructor(errorType: UserErrorType) {
    super("");
    this.errorType = errorType;
  }
}

export default UserError;
