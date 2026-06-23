import dotenv from "dotenv";
import app from "./src/routes";
import "./src/config/db";

dotenv.config();

app.listen(3001, () => {
  console.log("Serveur démarré sur le port 3001");
});
