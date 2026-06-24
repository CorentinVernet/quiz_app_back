import login from "../services/loginService";
import UserError from "../repositories/UserError";
import { Request, Response } from "express";

const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password);
    res.json({ token });
  } catch (error) {
    if (error instanceof UserError) {
      switch (error.errorType) {
        case "MISSING_CREDENTIALS":
          res.status(401).send();
          break;
        case "USER_NOT_FOUND":
          res.status(404).send();
          break;
        case "INVALID_PASSWORD":
          res.status(403).send();
          break;
        default:
          res.status(500).send();
      }
    } else {
      res.status(500).send();
    }
  }
};

export default loginController;
