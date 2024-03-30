import { searchCartsPorId, searchUserPorId, searchProductsPorId, deleteAllProductosPorId, deleteProductoDelCarritoPorId, crearCarrito, cargarCarrito } from '../services/funciones.js';

const admin = {
  name: process.env.adminName,
  lastName: process.env.adminLastName,
  email: process.env.adminEmail,
  cart: process.env.adminCart,
  rol: process.env.adminRol
};

const cartController = {};

cartController.deleteAllProductos = async (req, res) => {
  try {
    const idCarrito = parseInt(req.params.id, 10);
    await deleteAllProductosPorId(idCarrito);
    res.status(200).send(`Todos los productos del carrito con id ${idCarrito} han sido eliminados.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

cartController.deleteProductoDelCarrito = async (req, res) => {
  try {
    const idC = parseInt(req.params.idCarrito, 10);
    const idP = parseInt(req.params.idProducto, 10);
    await deleteProductoDelCarritoPorId(idC, idP);
    res.status(200).send(`Producto con id ${idP} eliminado del carrito con id ${idC}.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

cartController.crearNuevoCarrito = async (req, res) => {
  try {
    const nuevoCarritoId = await crearCarrito();
    res.status(201).json({ id: nuevoCarritoId });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

cartController.agregarProductoAlCarrito = async (req, res) => {
  try {
    const idCarrito = parseInt(req.params.idCarrito, 10);
    const idProducto = parseInt(req.params.idProducto, 10);
    await cargarCarrito(idCarrito, idProducto);
    res.status(200).send(`Producto con id ${idProducto} agregado al carrito con id ${idCarrito}.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

cartController.mostrarCarrito = async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const marca = req.query.marca || '';
    const orden = req.query.orden || 'asc';
    const id = req.params.id;
    const carrito = await searchCartsPorId(id);
    if (!carrito) {
      return res.status(404).send("Carrito no encontrado");
    }
    const productosEnCarrito = [];
    for (const idProducto of carrito.ids) {
      const producto = await searchProductsPorId(idProducto, marca, orden);
      if (producto) {
        productosEnCarrito.push(producto[0]);
      }
    }
    let user;

    if (userId != 1) {
      user = await searchUserPorId(userId);
    } else {
      user = admin;
    }
    console.log(productosEnCarrito)
    res.render("cart", { title: "Carrito de Compras", carrito: productosEnCarrito, marca: marca, orden: orden, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default cartController;
