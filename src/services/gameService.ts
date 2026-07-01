import { readGamesByUser } from "../repositories/gameRepository.ts";

export const readGamesByUserService = async (userId: string) =>
  await readGamesByUser(userId);
