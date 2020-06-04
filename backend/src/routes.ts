import express from "express";
import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

const routes = express.Router();

//  DECLARANDO AS CLASSES
const itemsController = new ItemsController();
const pointsController = new PointsController();

//  ROTAS
routes.get("/items", itemsController.index);
routes.post("/points", pointsController.store);

export default routes;
