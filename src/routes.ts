import express from "express";
import {
  createRoundController,
  updateRoundController,
} from "./controllers/roundController.ts";
import { readGamesByUserController } from "./controllers/gameController.ts";
import {
  createAccuracyController,
  readAccuracyByUserByGameByThemeController,
  readAccuracyByUserByRoundByThemeController,
  readAccuracyByUserByThemeController,
  updateAccuracyController,
} from "./controllers/accuracyController.ts";
import { loginController } from "./controllers/loginController.ts";
import { signUpController } from "./controllers/signUpController.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USER
app.post("/sign-up", signUpController);
app.post("/login", loginController);

// ROUND
app.post("/round/create", createRoundController);
app.post("/round/update", updateRoundController);

app.post("/game/user", readGamesByUserController);

// ACCURACY
app.post("/accuracy/create", createAccuracyController);
app.post("/accuracy/user/theme", readAccuracyByUserByThemeController);
app.post(
  "/accuracy/user/round/theme",
  readAccuracyByUserByRoundByThemeController,
);
app.post(
  "/accuracy/user/game/theme",
  readAccuracyByUserByGameByThemeController,
);
app.post("/accuracy/update", updateAccuracyController);

export default app;
