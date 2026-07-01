import { Theme } from "./Theme.ts";

export type UserDTO = {
  id: string;
  password: string;
  email: string;
  username: string;
  is_bot: boolean;
  total_wins: number;
  total_score: number;
  total_played_games: number;
  created_at: Date;
  updated_at: Date;
  preferred_theme: Theme;
};
