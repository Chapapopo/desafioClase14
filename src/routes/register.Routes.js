import express from 'express';
import { ensureAuthenticated } from '../services/funciones.js';
import registerController from '../controllers/registerController.js'; // Importa el controlador para la ruta de creación de usuarios

const router = express.Router();

router.post('/', ensureAuthenticated, registerController.createUser);

export default router;

