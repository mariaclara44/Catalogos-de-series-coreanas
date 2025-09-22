import express from "express";
import { createSerie, getAllSeries, getById, serieDelete} from "./../controllers/kDramasControllers.js"

const router = express.Router();

router.get("/", getAllSeries);
router.get("/:id",getById);
router.post("/", createSerie);
router.delete("/:id", serieDelete);



export default router