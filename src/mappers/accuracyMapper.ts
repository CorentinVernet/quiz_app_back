import { AccuracyDTO } from "../models/AccuracyDTO.ts";
import { userEntityToUserDTO } from "../mappers/userMapper.ts";
import { gameEntityToGameDTO } from "../mappers/gameMapper.ts";
import { roundEntityToRoundDTO } from "../mappers/roundMapper.ts";
import AccuracyError from "../errors/AccuracyError.ts";

export const accuracyDTOToAccuracyEntity = (accuracyDTO: AccuracyDTO) => {
  if (
    accuracyDTO == null ||
    accuracyDTO.user == null ||
    accuracyDTO.user.id == null
  ) {
    throw new AccuracyError("MISSING_USER_ID");
  }
  if (
    (accuracyDTO.game == null || accuracyDTO.game.id == null) &&
    (accuracyDTO.round == null || accuracyDTO.round.id == null)
  ) {
    throw new AccuracyError("MISSING_ROUND_ID_OR_GAME_ID");
  }
  return {
    id: accuracyDTO.id,
    theme: accuracyDTO.theme,
    accuracy_score: accuracyDTO.accuracy_score,
    game_id: accuracyDTO.game?.id,
    user_id: accuracyDTO.user?.id,
    round_id: accuracyDTO.round?.id,
  };
};

export const accuracyEntityToAccuracyDTO = (
  accuracyEntity: Record<string, any>,
): AccuracyDTO | null => {
  if (accuracyEntity == null) {
    return null;
  }

  return {
    id: accuracyEntity.id,
    theme: accuracyEntity.theme,
    accuracy_score: accuracyEntity.accuracy_score,
    game: accuracyEntity.game ? gameEntityToGameDTO(accuracyEntity.game) : null,
    user: accuracyEntity.user ? userEntityToUserDTO(accuracyEntity.user) : null,
    round: accuracyEntity.round
      ? roundEntityToRoundDTO(accuracyEntity.round)
      : null,
  };
};
