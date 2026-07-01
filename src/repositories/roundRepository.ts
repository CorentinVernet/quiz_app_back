import sql from "../config/db.ts";
import RoundError from "../errors/RoundError.ts";
import {
  roundDTOToRoundEntity,
  roundEntityToRoundDTO,
} from "../mappers/roundMapper.ts";
import { RoundDTO } from "../models/RoundDTO.ts";

export const readRound = async (roundId: number): Promise<RoundDTO | null> => {
  const round = await sql`SELECT * FROM round WHERE id = ${roundId};`;
  return roundEntityToRoundDTO(round[0]);
};

export const readRoundByGameIdByRoundIndex = async (
  gameId: string,
  roundIndex: number,
) => {
  const round =
    await sql`SELECT * FROM round WHERE game_id = ${gameId} AND round_index = ${roundIndex};`;
  return roundEntityToRoundDTO(round[0]);
};

export const createRound = async (roundDTO: RoundDTO): Promise<void> => {
  const roundEntity = roundDTOToRoundEntity(roundDTO);
  const existingRound = await readRoundByGameIdByRoundIndex(
    roundEntity.game.id,
    roundEntity.round_index,
  );
  if (existingRound) {
    throw new RoundError("ROUND_ALREADY_EXISTS");
  }

  await sql`INSERT INTO round
              (theme, 
              round_index,  
              is_draw_round,
              created_at,
              updated_at,
              game_id,
              player1_number_correct_answers,
              player2_number_correct_answers,
              round_winner_id)
            VALUES
              (${roundEntity.theme},
              ${roundEntity.round_index},
              ${roundEntity.is_draw_round},
              ${roundEntity.created_at},
              ${roundEntity.updated_at},
              ${roundEntity.game_id},
              ${roundEntity.player1_number_correct_answers},
              ${roundEntity.player2_number_correct_answers},
              ${roundEntity.round_winner_id});`;
};

export const updateRound = async (roundDTO: RoundDTO): Promise<void> => {
  const roundEntity = roundDTOToRoundEntity(roundDTO);
  const existingRound = await readRound(roundEntity.id);
  if (!existingRound) {
    throw new RoundError("ROUND_NOT_FOUND");
  }
  await sql`UPDATE round SET
              round_index = ${roundEntity.round_index},
              is_draw_round = ${roundEntity.is_draw_round},
              updated_at = ${roundEntity.updated_at},
              player1_number_correct_answers = ${roundEntity.player1_number_correct_answers},
              player2_number_correct_answers = ${roundEntity.player2_number_correct_answers},
              round_winner_id = ${roundEntity.round_winner_id}
              WHERE id = ${roundEntity.id},`;
};

export const deleteRound = async (roundId: number): Promise<void> => {
  const existingRound = await readRound(roundId);
  if (!existingRound) {
    throw new RoundError("ROUND_NOT_FOUND");
  }
  await sql`DELETE FROM round WHERE id = ${roundId};`;
};
