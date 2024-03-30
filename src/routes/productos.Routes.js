import express from 'express';
import { ensureAuthenticated } from '../services/funciones.js';
import productController from '../controllers/productController.js'; // Importa el controlador para la lógica de productos

const router = express.Router();

// Ruta para ver un solo producto por ID
router.get('/:id', ensureAuthenticated, productController.getProductById);

// Ruta para borrar un producto por ID
router.delete('/:id', productController.deleteProductById);

export default router;

