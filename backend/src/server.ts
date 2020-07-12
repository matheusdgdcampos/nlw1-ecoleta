import express from "express";
import cors from "cors";
import { resolve } from "path";
import routes from "./routes";
import { errors } from "celebrate";

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());
//  rota para acessar todos os ícones cadastrados
app.use("/uploads", express.static(resolve(__dirname, "..", "uploads")));
app.use(routes);

app.use(errors());

app.listen(port, () => console.log("server is running"));
