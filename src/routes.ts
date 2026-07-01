import express from "express";
import loginController from "./controllers/loginController.ts";
import signUpController from "./controllers/signUpController.ts";
import { createRoundController } from "./controllers/roundController.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/sign-up", signUpController);
app.post("/login", loginController);

app.post("/round/create", createRoundController);

export default app;
