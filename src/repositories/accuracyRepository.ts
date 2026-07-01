import {
  accuracyDTOToAccuracyEntity,
  accuracyEntityToAccuracyDTO,
} from "../mappers/accuracyMapper.ts";
import sql from "../config/db.ts";
import { AccuracyDTO } from "../models/AccuracyDTO.ts";
import AccuracyError from "../errors/AccuracyError.ts";
import { Theme } from "../models/Theme.ts";

export const createAccuracy = async (
  accuracyDTO: AccuracyDTO,
): Promise<void> => {
  const accuracyEntity = accuracyDTOToAccuracyEntity(accuracyDTO);
  await sql`INSERT INTO accuracy
              (theme, 
              game_id,
              round_id, 
              user_id, 
              accuracy_score)
            VALUES
              (${accuracyEntity.theme}, 
              ${accuracyEntity.game_id}, 
              ${accuracyEntity.round_id}, 
              ${accuracyEntity.user_id},
              ${accuracyEntity.accuracy_score});`;
};

export const readAccuracy = async (
  accuracyId: string,
): Promise<AccuracyDTO | null> => {
  const accuracy = await sql`SELECT * 
    FROM accuracy a
    LEFT JOIN app_user u ON u.id = a.user_id
    LEFT JOIN round r ON r.id = a.round_id
    LEFT JOIN game g ON g.id = a.game_id
    WHERE a.id = ${accuracyId};`;
  return accuracyEntityToAccuracyDTO(accuracy[0]);
};

/**
 * Find the users's global accuracy on a given theme.
 * This does not concern any game or round.
 *
 * @param userId
 * @param theme
 * @returns
 */
export const readAccuracyByUserByTheme = async (
  userId: string,
  theme: Theme,
) => {
  const accuracy = await sql`SELECT * 
    FROM accuracy a
    LEFT JOIN app_user u ON u.id = a.user_id
    WHERE a.user_id = ${userId} 
    AND a.theme = ${theme};`;
  return accuracyEntityToAccuracyDTO(accuracy);
};

/**
 * Find the user's accuracy during a specific round on a given theme.
 * This is not the user's global accuracy. See {@link readAccuracyByUserByTheme} for this need.
 *
 * @param userId
 * @param roundId
 * @param theme
 * @returns
 */
export const readAccuracyByUserByRoundByTheme = async (
  userId: string,
  roundId: string,
  theme: Theme,
) => {
  const accuracy = await sql`SELECT * 
    FROM accuracy a
    LEFT JOIN app_user u ON u.id = a.user_id
    LEFT JOIN round r ON r.id = a.round_id
    WHERE a.user_id = ${userId} 
    AND a.round_id = ${roundId}
    AND a.theme = ${theme};`;
  return accuracyEntityToAccuracyDTO(accuracy);
};

/**
 * Find the user's accuracy during a specific game on a given theme.
 * This corresponds to the accumulated accuracies on every round of this game.
 *
 * @param userId
 * @param gameId
 * @param theme
 * @returns
 */
export const readAccuracyByUserByGameByTheme = async (
  userId: string,
  gameId: string,
  theme: Theme,
) => {
  const accuracy = await sql`SELECT * 
    FROM accuracy a
    LEFT JOIN app_user u ON u.id = a.user_id
    LEFT JOIN game g ON g.id = a.round_id
    WHERE a.user_id = ${userId} 
    AND a.game_id = ${gameId}
    AND a.theme = ${theme};`;
  return accuracyEntityToAccuracyDTO(accuracy);
};

export const updateAccuracy = async (
  accuracyDTO: AccuracyDTO,
): Promise<void> => {
  const accuracyEntity = accuracyDTOToAccuracyEntity(accuracyDTO);
  if (accuracyEntity.id == null) {
    throw new AccuracyError("MISSING_ID");
  }
  const existingAccuracy = await readAccuracy(accuracyEntity.id);
  if (!existingAccuracy) {
    throw new AccuracyError("ACCURACY_NOT_FOUND");
  }
  await sql`UPDATE accuracy SET
              (accuracy_score)
              VALUES
              (${accuracyEntity.accuracy_score})
              WHERE id = ${accuracyEntity.id};`;
};

export const deleteAccuracy = async (accuracyId: string): Promise<void> => {
  const existingAccuracy = await readAccuracy(accuracyId);
  if (!existingAccuracy) {
    throw new AccuracyError("ACCURACY_NOT_FOUND");
  }
  await sql`DELETE FROM accuracy WHERE id = ${accuracyId};`;
};
