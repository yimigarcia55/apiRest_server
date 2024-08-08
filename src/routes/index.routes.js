import { Router } from "express";
import { getconsulta } from "../controllers/index.controllers.js";


const router = Router();

router.get('/consulta', getconsulta);

export default router;