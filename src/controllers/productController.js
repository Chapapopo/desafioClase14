import { searchProductsPorId2, searchUserPorId } from '../services/funciones.js';
import Product from '../model/producto.model.js'; // Importa el modelo Product

const productController = {};

// Función para ver un producto por ID
productController.getProductById = async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const idProducto = parseInt(req.params.id, 10);
    const producto = await searchProductsPorId2(idProducto);

    if (!producto) {
      res.status(404).send(`No se encontró un producto con id ${idProducto}.`);
      return;
    }

    let user; // Declaración de la variable user fuera del bloque if

    if (userId != 1) {
      user = await searchUserPorId(userId);
    } else {
      user = admin; // Asegúrate de tener definida la variable admin en tu código
    }

    res.render("producto", { title: 'Producto', producto: producto, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para borrar un producto por ID
productController.deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send("Producto no encontrado");
    }
    res.status(200).send("Producto eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default productController;

