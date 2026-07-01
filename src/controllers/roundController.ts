import { Request, Response } from "express";
import { RoundDTO } from "../models/RoundDTO.ts";
import {
  createRoundService,
  updateRoundService,
} from "../services/roundService.ts";
import RoundError from "../errors/RoundError.ts";

export const createRoundController = async (req: Request, res: Response) => {
  const {
    theme,
    roundIndex,
    game: { id },
    isDrawRound,
  } = req.body;
  const roundDTO: RoundDTO = {
    game: { id },
    theme: theme,
    round_winner: null,
    round_index: roundIndex,
    is_draw_round: isDrawRound,
    player1_number_correct_answers: 0,
    player2_number_correct_answers: 0,
  };
  try {
    await createRoundService(roundDTO);
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

export const updateRoundController = async (req: Request, res: Response) => {
  const {
    id,
    roundIndex,
    isDrawRound,
    player1NumberCorrectAnswers,
    player2NumberCorrectAnswers,
    roundWinner: { id: roundWinnerId },
  } = req.body;
  const roundDTO: RoundDTO = {
    id,
    round_index: roundIndex,
    is_draw_round: isDrawRound,
    round_winner: { id: roundWinnerId },
    player1_number_correct_answers: player1NumberCorrectAnswers,
    player2_number_correct_answers: player2NumberCorrectAnswers,
  };
  try {
    await updateRoundService(roundDTO);
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
