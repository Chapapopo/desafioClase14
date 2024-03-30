import express from 'express';

const router = express.Router();

// Ruta para cerrar sesión
router.post("/", (req, res) => {
    // Destruye la sesión, eliminando el usuario de la sesión
    req.session.destroy();
    res.send("Sesión cerrada correctamente");
});

export default router;