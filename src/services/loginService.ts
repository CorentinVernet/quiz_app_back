import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserError from "../errors/UserError.ts";
import { readUser } from "../repositories/userRepository.ts";

const login = async (username: string, password: string): Promise<string> => {
  if (!username || !password) {
    throw new UserError("MISSING_CREDENTIALS");
  }

  const user = await readUser(username);
  if (!user) {
    throw new UserError("USER_NOT_FOUND");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UserError("INVALID_PASSWORD");
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10h",
    },
  );
  return token;
};

export default login;
