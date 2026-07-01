import { Request, Response } from "express";
import { readGamesByUserService } from "../services/gameService.ts";
import GameError from "../errors/GameError.ts";

export const readGamesByUserController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.body;
  try {
    const gameDTOs = await readGamesByUserService(userId);
    res.status(200).json({ gameDTOs });
  } catch (error) {
    if (error instanceof GameError) {
      switch (error.errorType) {
        default:
          res.status(500).send();
      }
    }
  }
};
