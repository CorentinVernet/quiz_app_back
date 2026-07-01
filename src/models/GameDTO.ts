import { UserDTO } from "./UserDTO.ts";

export type GameDTO = {
  id: string;
  ended_at: Date;
  created_at: Date;
  updated_at: Date;
  round_index: number;
  is_draw_game: boolean;
  player1: UserDTO | { id: string } | null;
  player2: UserDTO | { id: string } | null;
  game_winner: UserDTO | { id: string } | null;
};
