import express from 'express';
import { ensureAuthenticated } from '../services/funciones.js';
import currentController from '../controllers/currentController.js';

const router = express.Router();

router.get('/', ensureAuthenticated, currentController.mostrarUsuarioActual);

export default router;
