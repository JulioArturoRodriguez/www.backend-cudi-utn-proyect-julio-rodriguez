import Carrito from '../model/Carrito.js';
import User from '../model/usuario.js';
import Producto from '../model/producto.js';

class CarritoService {
    // Agregar producto al carrito
    static async agregarProducto(username, productoNombre) {
        const usuario = await User.findOne({ username });
        if (!usuario) throw new Error(`Usuario con username "${username}" no encontrado`);

        const producto = await Producto.findOne({ nombre: productoNombre });
        if (!producto) throw new Error(`Producto con nombre "${productoNombre}" no encontrado`);

        let carrito = await Carrito.findOne({ usuarioId: usuario._id });

        if (!carrito) {
            carrito = new Carrito({ usuarioId: usuario._id, productos: [] });
        }

        const productoExistente = carrito.productos.find(p => p.productoId.toString() === producto._id.toString());
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.productos.push({ productoId: producto._id, cantidad: 1, nombre: producto.nombre, descripcion: producto.descripcion, precio: producto.precio });
        }

        await carrito.save();
        return carrito;
    }

    // Eliminar producto del carrito
    static async eliminarProducto(username, productoNombre) {
        const usuario = await User.findOne({ username });
        if (!usuario) throw new Error(`Usuario con username "${username}" no encontrado`);

        const producto = await Producto.findOne({ nombre: productoNombre });
        if (!producto) throw new Error(`Producto con nombre "${productoNombre}" no encontrado`);

        const carrito = await Carrito.findOne({ usuarioId: usuario._id });
        if (!carrito) throw new Error('El carrito no existe');

        const productoIndex = carrito.productos.findIndex(p => p.productoId.toString() === producto._id.toString());
        if (productoIndex === -1) throw new Error('El producto no está en el carrito');

        carrito.productos.splice(productoIndex, 1);

        await carrito.save();
        return carrito;
    }
}

export default CarritoService;