import express from "express";
import { getLiga, getLigabyID, postLiga, patchLiga, deleteLiga } from "../controllers/LigaControllers.js";

const router = express.Router();

router.get('/ligas', getLiga);
router.get('/ligas/:id', getLigabyID);
router.post('/ligas', postLiga);
router.patch('/ligas/:id', patchLiga);
router.delete('/ligas/:id', deleteLiga);


export default router;