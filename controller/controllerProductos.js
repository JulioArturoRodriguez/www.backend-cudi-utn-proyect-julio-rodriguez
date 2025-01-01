import { agregarProducto, editarProducto, obtenerProductoPorId, obtenerTodosLosProductos    } from "../service/serviceProducto.js";
import Producto from "../model/producto.js"; // Asegúrate de que la ruta sea correcta
import { validationResult } from "express-validator";


const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};



// Controlador para agregar un producto
export const agregarProductoController = async (req, res) => {
    // Manejar errores de validación
    const validationErrors = handleValidationErrors(req, res);
    if (validationErrors) return validationErrors;

    try {
        const { nombre, precio, categoria, descripcion, stock } = req.body;

        const producto = await agregarProducto({
            nombre,
            precio,
            categoria,
            descripcion,
            stock,
        });

        return res.status(201).json({
            status: "success",
            message: "Producto agregado correctamente",
            data: producto,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al agregar el producto",
            error: error.message,
        });
    }
};

// Controlador para editar un producto
export const editarProductoController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { nombre, precio, categoria, descripcion, stock } = req.body;

        const producto = await editarProducto(id, {
            nombre,
            precio,
            categoria,
            descripcion,
            stock
        });

        return res.status(200).json({
            status: "success",
            message: "Producto editado correctamente",
            data: producto
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};


export const obtenerProductoPorIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await obtenerProductoPorId(id);
        res.status(200).json(producto);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
};

export const obtenerTodosLosProductosController = async (req, res) => {
    try {
        const productos = await obtenerTodosLosProductos();
        res.status(200).json(productos); // Respuesta con todos los productos
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};
