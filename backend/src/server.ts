import express from "express";
import { resolve } from "path";
import routes from "./routes";

const app = express();
const port = 3333;

app.use(express.json());
//  rota para acessar todos os ícones cadastrados
app.use("/uploads", express.static(resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(port, () => console.log("server is running"));
