import RoundError from "../errors/RoundError.ts";
import { RoundDTO } from "../models/RoundDTO.ts";
import { gameEntityToGameDTO } from "./gameMapper.ts";
import { userEntityToUserDTO } from "./userMapper.ts";

export const roundEntityToRoundDTO = (roundEntity: any): RoundDTO | null => {
  if (!roundEntity) {
    return null;
  }
  return {
    id: roundEntity.id,
    theme: roundEntity.theme,
    round_index: roundEntity.round_index,
    is_draw_round: roundEntity.is_draw_round,
    created_at: new Date(roundEntity.created_at),
    updated_at: new Date(roundEntity.updated_at),
    game: roundEntity.game ? gameEntityToGameDTO(roundEntity.game) : null,
    player1_number_correct_answers: roundEntity.player1_number_correct_answers,
    player2_number_correct_answers: roundEntity.player2_number_correct_answers,
    round_winner: roundEntity.round_winner
      ? userEntityToUserDTO(roundEntity.round_winner)
      : null,
  };
};

export const roundDTOToRoundEntity = (
  roundDTO: RoundDTO,
): Record<string, any> => {
  if (!roundDTO || !roundDTO.game || !roundDTO.game.id) {
    throw new RoundError("MISSING_GAME_ID");
  }
  if (!roundDTO.theme) {
    throw new RoundError("MISSING_THEME");
  }
  return {
    id: roundDTO.id,
    theme: roundDTO.theme,
    game_id: roundDTO.game.id,
    round_index: roundDTO.round_index,
    is_draw_round: roundDTO.is_draw_round,
    round_winner_id: roundDTO.round_winner?.id,
    created_at: roundDTO.created_at?.toISOString(),
    updated_at: roundDTO.updated_at?.toISOString(),
    player1_number_correct_answers: roundDTO.player1_number_correct_answers,
    player2_number_correct_answers: roundDTO.player2_number_correct_answers,
  };
};
