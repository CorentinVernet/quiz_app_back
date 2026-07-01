import { GameDTO } from "../models/GameDTO.ts";
import { userEntityToUserDTO } from "./userMapper.ts";

export const gameEntityToGameDTO = (
  gameEntity: Record<string, any>,
): GameDTO => {
  return {
    id: gameEntity.id,
    round_index: gameEntity.round_index,
    is_draw_game: gameEntity.is_draw_game,
    ended_at: new Date(gameEntity.ended_at),
    created_at: new Date(gameEntity.created_at),
    updated_at: new Date(gameEntity.updated_at),
    player1: userEntityToUserDTO(gameEntity.player1),
    player2: userEntityToUserDTO(gameEntity.player2),
    game_winner: userEntityToUserDTO(gameEntity.game_winner),
  };
};

export const gameDTOToGameEntity = (gameDTO: GameDTO): Record<string, any> => {
  if (gameDTO == null) {
    throw new Error("gameDTO cannot be null or undefined");
  }
  return {
    id: gameDTO.id,
    player1_id: gameDTO.player1?.id,
    player2_id: gameDTO.player2?.id,
    round_index: gameDTO.round_index,
    is_draw_game: gameDTO.is_draw_game,
    game_winner_id: gameDTO.game_winner?.id,
    ended_at: gameDTO.ended_at?.toISOString(),
    created_at: gameDTO.created_at?.toISOString(),
    updated_at: gameDTO.updated_at?.toISOString(),
  };
};
