import bcrypt from 'bcryptjs';
import Users from '../model/user.model.js'; // Importa el modelo User
import { crearCarrito } from '../services/funciones.js';
import passport from 'passport';

const registerController = {};

registerController.createUser = async (req, res, next) => {
  try {
    const { name, lastName, email, password, age } = req.body;

    // Hash del password
    const hashedPassword = await bcrypt.hash(password, 10);
    const cart = await crearCarrito();

    // Crear un nuevo usuario
    const nuevoUsuario = new Users({
      name,
      lastName,
      email,
      age,
      cart,
      password: hashedPassword // Usar el password hasheado
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Autenticar al usuario recién registrado
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/log',
    })(req, res, next);
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res.redirect("/log");
  }
};

export default registerController;
