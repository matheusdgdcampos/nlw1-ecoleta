import express from "express";

import multer from "multer";
import multerConfig from "./config/multer";

import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

const routes = express.Router();
const uploads = multer(multerConfig);

//  DECLARANDO AS CLASSES
const itemsController = new ItemsController();
const pointsController = new PointsController();

//  ROTAS
routes.get("/items", itemsController.index);

routes.post("/points", uploads.single("image"), pointsController.create);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

export default routes;
