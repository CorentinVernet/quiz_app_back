import { Theme } from "../models/Theme.ts";
import { UserDTO } from "../models/UserDTO.ts";

export const userEntityToUserDTO = (
  userEntity: Record<string, any>,
): UserDTO | null => {
  if (userEntity == null) {
    return null;
  }

  return {
    id: userEntity.id,
    email: userEntity.email,
    is_bot: userEntity.is_bot,
    password: userEntity.password,
    username: userEntity.username,
    total_wins: userEntity.total_wins,
    total_score: userEntity.total_score,
    created_at: new Date(userEntity.created_at),
    updated_at: new Date(userEntity.updated_at),
    total_played_games: userEntity.total_played_games,
    preferred_theme: userEntity.preferred_theme as Theme,
  } as UserDTO;
};

export const userDTOToUserEntity = (
  userDTO: UserDTO,
): Record<string, any> | null => {
  if (userDTO == null) {
    throw new Error("userDTO cannot be null or undefined");
  }
  return {
    id: userDTO.id,
    email: userDTO.email,
    is_bot: userDTO.is_bot,
    password: userDTO.password,
    username: userDTO.username,
    total_wins: userDTO.total_wins,
    total_score: userDTO.total_score,
    preferred_theme: userDTO.preferred_theme,
    created_at: userDTO.created_at.toISOString(),
    updated_at: userDTO.updated_at.toISOString(),
    total_played_games: userDTO.total_played_games,
  } as Record<string, any>;
};
