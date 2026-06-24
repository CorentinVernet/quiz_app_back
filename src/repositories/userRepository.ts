import sql from "../config/db";
import UserError from "../errors/UserError";

const TABLE = "app_user";

export const createUser = async (
  username: string,
  password: string,
): Promise<void> => {
  await sql`INSERT INTO ${TABLE} (username, password) VALUES ('${username}','${password}');`;
  return;
};

export const readUser = async (
  username: string,
): Promise<{ username: string; password: string } | null> => {
  await sql`SELECT username, password FROM ${TABLE} WHERE username = '${username}';`;
  return null;
};

export const updateUser = async (
  username: string,
  password: string,
): Promise<void> => {
  const user = await readUser(username);
  if (!user) {
    throw new UserError("USER_NOT_FOUND");
  }
  await sql`UPDATE ${TABLE} SET password = ${password} WHERE username = '${username}';`;
};

export const deleteUser = async (username: string): Promise<void> => {
  const user = await readUser(username);
  if (!user) {
    throw new UserError("USER_NOT_FOUND");
  }
  await sql`DELETE FROM ${TABLE} WHERE username = '${username}';`;
};
