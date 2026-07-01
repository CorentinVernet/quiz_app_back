import "dotenv/config";
import "./src/config/db.ts";
import app from "./src/routes.ts";

app.listen(3001, () => {
  console.log("Serveur démarré sur le port 3001");
});
