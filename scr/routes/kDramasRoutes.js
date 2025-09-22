import express from "express";
import { createSerie, getAllSeries, getById, getPorGenero, serieDelete, updateSerie} from "./../controllers/kDramasControllers.js"

const router = express.Router();

router.get("/", getAllSeries);
router.get("/:id",getById);
router.get("/genero/:genero", getPorGenero);
router.post("/", createSerie);
router.delete("/:id", serieDelete);
router.put("/:id", updateSerie);



export default router