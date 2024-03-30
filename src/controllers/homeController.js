import { searchProducts, searchUserPorId } from '../services/funciones.js';

const admin = {
  name: process.env.adminName,
  lastName: process.env.adminLastName,
  email: process.env.adminEmail,
  cart: process.env.adminCart,
  rol: process.env.adminRol
};

const homeController = {};

homeController.getHome = async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const page = parseInt(req.query.page) || 1; // Página actual, si no se proporciona, será la primera página
    const limit = parseInt(req.query.limit) || 10; // Cantidad de productos por página, por defecto 10
    const marca = req.query.marca || ''; // Marca para filtrar, si no se proporciona, será una cadena vacía
    const orden = req.query.orden || 'asc'; // Orden por precio, si no se proporciona, será ascendente
    const result = await searchProducts(page, limit, marca, orden);
    let user; // Declaración de la variable user fuera del bloque if

    if (userId != 1) {
      user = await searchUserPorId(userId);
    } else {
      user = admin;
    }

    console.log(user)

    res.render("home", { title: "Home handelbars", productos: result.productos, pagination: result.pagination, marca: marca, orden: orden, user: user }); // Renderiza la plantilla con los productos, la información de paginación, la marca y la orden para mostrarla en la plantilla
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export default homeController;