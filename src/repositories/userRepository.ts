import sql from "../config/db";
import UserError from "../errors/UserError";

export const createUser = async (
  username: string,
  password: string,
): Promise<void> => {
  const user = await readUser(username);
  if (user) {
    throw new UserError("USER_ALREADY_EXISTS");
  }
  await sql`INSERT INTO app_user (username, password) VALUES (${username}, ${password});`;
};

export const readUser = async (
  username: string,
): Promise<{ username: string; password: string } | null> => {
  const user =
    await sql`SELECT username, password FROM app_user WHERE username = ${username};`;
  return user[0] as { username: string; password: string } | null;
};

export const updateUser = async (
  username: string,
  password: string,
): Promise<void> => {
  const user = await readUser(username);
  if (!user) {
    throw new UserError("USER_NOT_FOUND");
  }
  await sql`UPDATE app_user SET password = ${password} WHERE username = ${username};`;
};

export const deleteUser = async (username: string): Promise<void> => {
  const user = await readUser(username);
  if (!user) {
    throw new UserError("USER_NOT_FOUND");
  }
  await sql`DELETE FROM app_user WHERE username = ${username};`;
};
