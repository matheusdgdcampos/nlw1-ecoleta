import express from "express";
import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

const routes = express.Router();

//  DECLARANDO AS CLASSES
const itemsController = new ItemsController();
const pointsController = new PointsController();

//  ROTAS
routes.get("/items", itemsController.index);

routes.post("/points", pointsController.create);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

export default routes;
