import { Theme } from "./Theme.ts";
import { GameDTO } from "./GameDTO.ts";
import { UserDTO } from "./UserDTO.ts";
import { RoundDTO } from "./RoundDTO.ts";

export type AccuracyDTO = {
  id?: string;
  theme?: Theme;
  accuracy_score: number;
  game?: GameDTO | { id: string } | null;
  user?: UserDTO | { id: string } | null;
  round?: RoundDTO | { id: string } | null;
};
