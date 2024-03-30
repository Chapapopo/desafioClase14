import express from 'express';
import { ensureAuthenticated } from '../services/funciones.js';
import homeController from '../controllers/homeController.js'; // Importa el controlador para la lógica de la página de inicio

const router = express.Router();

router.get('/', ensureAuthenticated, homeController.getHome);

export default router;
