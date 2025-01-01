import Producto from '../model/producto.js';
import Carrito from '../model/carrito.js';





export const agregarProducto = async (datosProducto) => {
    try {
        const producto = new Producto(datosProducto);
        await producto.save();
        return producto;
    } catch (error) {
        throw new Error('Error al agregar el producto: ' + error.message);
    }
};
export const editarProducto = async (id, datosProducto) => {
    

    // Validar que datosProducto no esté vacío
    if (!datosProducto || Object.keys(datosProducto).length === 0) {
        console.log("Error: datosProducto vacío o no válido", datosProducto);
        throw new Error('Los datos del producto son necesarios para actualizar');
    }

    console.log("ID recibido:", id);
    console.log("Datos para actualizar:", datosProducto);

    try {
        const producto = await Producto.findByIdAndUpdate(
            id, // ID del documento a actualizar
            datosProducto, // Objeto con los campos a actualizar
            { new: true, runValidators: true } // Opciones de Mongoose
        );

        if (!producto) {
            console.log("Producto no encontrado con el ID:", id);
            throw new Error('Producto no encontrado');
        }

        return producto;
    } catch (error) {
        console.log("Error al intentar actualizar el producto:", error.message);
        throw new Error('Error al editar el producto: ' + error.message);
    }
};


export const obtenerProductoPorId = async (id) => {
    try {
        console.log("ID recibido para buscar producto:", id);

        // Buscar el producto por su ID
        const producto = await Producto.findById(id);

        if (!producto) {
            console.log("Producto no encontrado con el ID:", id);
            throw new Error('Producto no encontrado');
        }

        return producto;
    } catch (error) {
        console.log("Error al intentar obtener el producto:", error.message);
        throw new Error('Error al obtener el producto: ' + error.message);
    }
};


export const obtenerTodosLosProductos = async () => {
    try {
        const productos = await Producto.find();
        return productos;
    } catch (error) {
        throw new Error('Error al obtener los productos: ' + error.message);
    }
};
