import CarritoService from '../service/serviceCompra.js';


const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return null;
};

// Agregar producto al carrito
export const agregarProductoAlCarrito = async (req, res) => {
    try {
        const { username, nombre } = req.body; // Cambiado a 'nombre'

        if (!username || !nombre) {
            return res.status(400).json({ message: 'Faltan datos requeridos: username o nombre' });
        }

        const carritoActualizado = await CarritoService.agregarProducto(username, nombre); // Cambiado a 'nombre'
        res.status(200).json({ message: 'Producto agregado al carrito exitosamente', carrito: carritoActualizado });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ message: 'Error al agregar producto al carrito', error: error.message });
    }
};
export const eliminarProductoDelCarrito = async (req, res) => {
    try {
        const { username, nombre } = req.body;

        if (!username || !nombre) {
            return res.status(400).json({ message: 'Faltan datos requeridos: username o nombre' });
        }

        const carritoActualizado = await CarritoService.eliminarProducto(username, nombre);
        res.status(200).json({ message: 'Producto eliminado del carrito exitosamente', carrito: carritoActualizado });
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        res.status(500).json({ message: 'Error al eliminar producto del carrito', error: error.message });
    }
};

