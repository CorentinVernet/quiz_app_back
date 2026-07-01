import { RoundDTO } from "../models/RoundDTO.ts";
import {
  createRound,
  readRoundByGameIdByRoundIndex,
  updateRound,
} from "../repositories/roundRepository.ts";

export const createRoundService = async (roundDTO: RoundDTO): Promise<void> => {
  await createRound(roundDTO);
};

export const readRoundService = async (gameId: string, roundIndex: number) =>
  await readRoundByGameIdByRoundIndex(gameId, roundIndex);

export const updateRoundService = async (roundDTO: RoundDTO): Promise<void> => {
  await updateRound(roundDTO);
};
