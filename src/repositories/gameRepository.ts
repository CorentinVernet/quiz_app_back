import {
  gameDTOToGameEntity,
  gameEntityToGameDTO,
} from "../mappers/gameMapper.ts";
import sql from "../config/db.ts";
import { GameDTO } from "../models/GameDTO.ts";
import GameError from "../errors/GameError.ts";

export const readGame = async (gameId: number): Promise<GameDTO | null> => {
  const game = await sql`SELECT *
    FROM game g
    LEFT JOIN app_user p1 ON p1.id = g.player1_id
    LEFT JOIN app_user p2 ON p2.id = g.player2_id
    LEFT JOIN app_user a ON a.id = g.game_winner_id
    WHERE id = ${gameId};`;
  return gameEntityToGameDTO(game[0]);
};

export const createGame = async (gameDTO: GameDTO): Promise<void> => {
  const gameEntity = gameDTOToGameEntity(gameDTO);
  await sql`INSERT INTO game
              (ended_at, 
              is_draw_game,
              created_at, 
              updated_at, 
              player1_id, 
              player2_id, 
              game_winner_id,
              round_index)
            VALUES
              (${gameEntity.ended_at}, 
              ${gameEntity.is_draw_game}, 
              ${gameEntity.created_at}, 
              ${gameEntity.updated_at},
              ${gameEntity.player1_id}, 
              ${gameEntity.player2_id}, 
              ${gameEntity.game_winner?.id},  
              ${gameEntity.round_index});`;
};

export const updateGame = async (gameDTO: GameDTO): Promise<void> => {
  const gameEntity = gameDTOToGameEntity(gameDTO);
  const existingGame = await readGame(gameEntity.id);
  if (!existingGame) {
    throw new GameError("GAME_NOT_FOUND");
  }
  await sql`UPDATE game SET
              ended_at = ${gameEntity.ended_at},
              is_draw_game = ${gameEntity.is_draw_game},  
              updated_at = ${gameEntity.updated_at},
              game_winner_id = ${gameEntity.game_winner?.id},
              round_index = ${gameEntity.round_index}
              WHERE id = ${gameEntity.id};`;
};

export const deleteGame = async (gameId: number): Promise<void> => {
  const existingGame = await readGame(gameId);
  if (!existingGame) {
    throw new GameError("GAME_NOT_FOUND");
  }
  await sql`DELETE FROM game WHERE id = ${gameId};`;
};
