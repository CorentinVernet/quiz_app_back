import {
  userDTOToUserEntity,
  userEntityToUserDTO,
} from "../mappers/userMapper.ts";
import sql from "../config/db.ts";
import UserError from "../errors/UserError.ts";
import { UserDTO } from "../models/UserDTO.ts";

export const createUser = async (userDTO: UserDTO): Promise<void> => {
  const userEntity = userDTOToUserEntity(userDTO);
  const existingUsername = await readUser(userEntity?.username);
  const existingEmail = await readUser(userEntity?.email);
  if (existingUsername || existingEmail) {
    throw new UserError("USER_ALREADY_EXISTS");
  }
  await sql`INSERT INTO app_user 
            (username, 
            password, 
            email, 
            is_bot, 
            total_wins, 
            total_score, 
            total_played_games, 
            created_at, 
            updated_at, 
            preferred_theme) 
          VALUES 
            (${userEntity?.username}, 
            ${userEntity?.password}, 
            ${userEntity?.email}, 
            ${userEntity?.is_bot}, 
            ${userEntity?.total_wins}, 
            ${userEntity?.total_score}, 
            ${userEntity?.total_played_games}, 
            ${userEntity?.created_at},
            ${userEntity?.updated_at}, 
            ${userEntity?.preferred_theme});`;
};

export const readUser = async (username: string): Promise<UserDTO | null> => {
  const user = await sql`SELECT * FROM app_user WHERE username = ${username};`;
  return userEntityToUserDTO(user[0]);
};

export const updateUser = async (
  username: string,
  password: string,
): Promise<void> => {
  const existingUser = await readUser(username);
  if (!existingUser) {
    throw new UserError("USER_NOT_FOUND");
  }
  await sql`UPDATE app_user SET password = ${password} WHERE username = ${username};`;
};

export const deleteUser = async (username: string): Promise<void> => {
  const existingUser = await readUser(username);
  if (!existingUser) {
    throw new UserError("USER_NOT_FOUND");
  }
  await sql`DELETE FROM app_user WHERE username = ${username};`;
};
