import {
  updateAccuracyService,
  readAccuracyByUserByThemeService,
  readAccuracyByUserByGameByThemeService,
  readAccuracyByUserByRoundByThemeService,
} from "../services/accuracyService.ts";
import { Request, Response } from "express";
import RoundError from "../errors/RoundError.ts";
import { AccuracyDTO } from "../models/AccuracyDTO.ts";
import AccuracyError from "../errors/AccuracyError.ts";
import { createAccuracy } from "../repositories/accuracyRepository.ts";

export const createAccuracyController = async (req: Request, res: Response) => {
  const {
    accuracyScore,
    user: { id: userId },
    game: { id: gameId },
    round: { id: roundId },
    theme,
  } = req.body;
  const accuracyDTO: AccuracyDTO = {
    theme,
    user: { id: userId },
    game: { id: gameId },
    round: { id: roundId },
    accuracy_score: accuracyScore,
  };
  try {
    await createAccuracy(accuracyDTO);
    res.status(200).send();
  } catch (error) {
    if (error instanceof RoundError) {
      switch (error.errorType) {
        case "ROUND_ALREADY_EXISTS":
          res.status(409).send();
          break;
        case "MISSING_GAME_ID":
          res.status(401).send();
          break;
        case "ROUND_NOT_FOUND":
          res.status(404).send();
          break;
        default:
          res.status(500).send();
          break;
      }
    }
  }
};

export const readAccuracyByUserByThemeController = async (
  req: Request,
  res: Response,
) => {
  const {
    user: { id: userId },
    theme,
  } = req.body;
  try {
    const accuracyDTO = await readAccuracyByUserByThemeService(userId, theme);
    res.status(200).json({ accuracyDTO });
  } catch (error) {
    if (error instanceof AccuracyError) {
      switch (error.errorType) {
        default:
          res.status(500).send();
      }
    }
  }
};

export const readAccuracyByUserByRoundByThemeController = async (
  req: Request,
  res: Response,
) => {
  const {
    theme,
    user: { id: userId },
    round: { id: roundId },
  } = req.body;
  try {
    const accuracyDTO = await readAccuracyByUserByRoundByThemeService(
      userId,
      roundId,
      theme,
    );
    res.status(200).json({ accuracyDTO });
  } catch (error) {
    if (error instanceof AccuracyError) {
      switch (error.errorType) {
        default:
          res.status(500).send();
      }
    }
  }
};

export const readAccuracyByUserByGameByThemeController = async (
  req: Request,
  res: Response,
) => {
  const {
    theme,
    user: { id: userId },
    game: { id: gameId },
  } = req.body;
  try {
    const accuracyDTO = await readAccuracyByUserByGameByThemeService(
      userId,
      gameId,
      theme,
    );
    res.status(200).json({ accuracyDTO });
  } catch (error) {
    if (error instanceof AccuracyError) {
      switch (error.errorType) {
        default:
          res.status(500).send();
      }
    }
  }
};

export const updateAccuracyController = async (req: Request, res: Response) => {
  const { id, accuracyScore } = req.body;
  const accuracyDTO: AccuracyDTO = {
    id,
    accuracy_score: accuracyScore,
  };
  try {
    await updateAccuracyService(accuracyDTO);
    res.status(200).send();
  } catch (error) {
    if (error instanceof RoundError) {
      switch (error.errorType) {
        case "MISSING_THEME":
        case "MISSING_GAME_ID":
          res.status(401).send();
          break;
        case "ROUND_NOT_FOUND":
          res.status(404).send();
          break;
        default:
          res.status(500).send();
          break;
      }
    }
  }
};
