import { Request, Response } from "express";
import { connection } from "../database/connection";

export default class PointsController {
  async store(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    await connection("points").insert({
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });

    return res.json({ success: true });
  }
}
