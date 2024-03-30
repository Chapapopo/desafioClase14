import express from 'express';
import { ensureAuthenticated } from '../services/funciones.js';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.delete('/:id', cartController.deleteAllProductos);
router.delete('/:idCarrito/productos/:idProducto', cartController.deleteProductoDelCarrito);
router.post('/', cartController.crearNuevoCarrito);
router.post("/:idCarrito/productos/:idProducto", cartController.agregarProductoAlCarrito);
router.get('/:id', ensureAuthenticated, cartController.mostrarCarrito);

export default router;
