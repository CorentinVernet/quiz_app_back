import UserError from "../errors/UserError";
import { createUser } from "../repositories/userRepository";
import bcrypt from "bcrypt";

const signUp = async (username: string, password: string): Promise<void> => {
  if (!username || !password) {
    throw new UserError("MISSING_CREDENTIALS");
  }
  const encryptedPassword = bcrypt.hashSync(password, 10);
  await createUser(username, encryptedPassword);
};

export default signUp;
