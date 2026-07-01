import { Theme } from "./Theme.ts";
import { GameDTO } from "./GameDTO.ts";
import { UserDTO } from "./UserDTO.ts";

export type RoundDTO = {
  id?: string;
  theme?: Theme;
  created_at?: Date;
  updated_at?: Date;
  round_index: number;
  is_draw_round: boolean;
  game?: GameDTO | { id: string } | null;
  player1_number_correct_answers: number;
  player2_number_correct_answers: number;
  round_winner: UserDTO | { id: string } | null;
};
