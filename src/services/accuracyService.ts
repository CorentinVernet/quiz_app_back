import { AccuracyDTO } from "../models/AccuracyDTO.ts";
import { Theme } from "../models/Theme.ts";
import {
  readAccuracy,
  createAccuracy,
  updateAccuracy,
  readAccuracyByUserByTheme,
  readAccuracyByUserByGameByTheme,
  readAccuracyByUserByRoundByTheme,
} from "../repositories/accuracyRepository.ts";

export const createAccuracyService = async (
  accuracyDTO: AccuracyDTO,
): Promise<void> => {
  await createAccuracy(accuracyDTO);
};

export const readAccuracyService = async (accuracyId: string) =>
  await readAccuracy(accuracyId);

export const readAccuracyByUserByThemeService = async (
  userId: string,
  theme: Theme,
) => await readAccuracyByUserByTheme(userId, theme);

export const readAccuracyByUserByRoundByThemeService = async (
  userId: string,
  roundId: string,
  theme: Theme,
) => await readAccuracyByUserByRoundByTheme(userId, roundId, theme);

export const readAccuracyByUserByGameByThemeService = async (
  userId: string,
  gameId: string,
  theme: Theme,
) => await readAccuracyByUserByGameByTheme(userId, gameId, theme);

export const updateAccuracyService = async (
  accuracyDTO: AccuracyDTO,
): Promise<void> => {
  await updateAccuracy(accuracyDTO);
};
