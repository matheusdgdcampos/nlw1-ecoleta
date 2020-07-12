import express from "express";

import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";

import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

const routes = express.Router();
const uploads = multer(multerConfig);

//  DECLARANDO AS CLASSES
const itemsController = new ItemsController();
const pointsController = new PointsController();

//  ROTAS
routes.get("/items", itemsController.index);

routes.post(
  "/points",
  uploads.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false, //Amostra todos os campos que deram erro na requisição
    }
  ),
  pointsController.create
);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

export default routes;
