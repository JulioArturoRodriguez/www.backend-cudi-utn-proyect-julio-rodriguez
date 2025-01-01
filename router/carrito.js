import express from 'express';
import { agregarProductoAlCarrito, eliminarProductoDelCarrito } from '../controller/carritoController.js';

const router = express.Router();

// Ruta para agregar un producto al carrito
router.post('/carrito/agregar', async (req, res) => {
    try {
        const { username, nombre } = req.body;

        if (!username || !nombre) {
            return res.status(400).json({ message: 'Se requieren el username y el nombre del producto.' });
        }

        // Llamamos a la función del controlador para agregar el producto
        await agregarProductoAlCarrito(req, res);
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({ message: 'Error al agregar el producto al carrito.', error: error.message });
    }
});


router.delete('/carrito/eliminar', async (req, res) => {
    try {
        const { username, nombre } = req.body;

        if (!username || !nombre) {
            return res.status(400).json({ message: 'Se requieren el username y el nombre del producto.' });
        }

        // Llamamos a la función del controlador para eliminar el producto
        await eliminarProductoDelCarrito(req, res);
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).json({ message: 'Error al eliminar el producto del carrito.', error: error.message });
    }
});


export default router;
