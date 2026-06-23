import UserError from "../repositories/UserError";
import signUp from "../services/signUpService";
import { Request, Response } from "express";

const signUpController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    await signUp(username, password);
  } catch (error) {
    if (error instanceof UserError) {
      switch (error.errorType) {
        case "MISSING_CREDENTIALS":
          res.status(401);
          break;
        case "USER_ALREADY_EXISTS":
          res.status(409);
          break;
        default:
          res.status(500);
      }
    }
  }
};

export default signUpController;
