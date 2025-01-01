import { check, param } from "express-validator";

// Validaciones para agregar un producto
export const validarAgregarProducto = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isString()
        .withMessage("El nombre debe ser una cadena de texto"),
    check("precio")
        .notEmpty()
        .withMessage("El precio es obligatorio")
        .isNumeric()
        .withMessage("El precio debe ser un número válido"),
    check("categoria")
        .notEmpty()
        .withMessage("La categoría es obligatoria")
        .isString()
        .withMessage("La categoría debe ser una cadena de texto"),
    check("stock")
        .notEmpty()
        .withMessage("El stock es obligatorio")
        .isInt({ min: 0 })
        .withMessage("El stock debe ser un número entero positivo"),
];

// Validaciones para las operaciones con el carrito
export const validarAgregarAlCarrito = [
    check("usuarioId")
        .notEmpty()
        .withMessage("El usuarioId es obligatorio")
        .isMongoId()
        .withMessage("El usuarioId debe ser un ID válido de MongoDB"),
    check("productoId")
        .notEmpty()
        .withMessage("El productoId es obligatorio")
        .isMongoId()
        .withMessage("El productoId debe ser un ID válido de MongoDB"),
    check("cantidad")
        .notEmpty()
        .withMessage("La cantidad es obligatoria")
        .isInt({ min: 1 })
        .withMessage("La cantidad debe ser al menos 1"),
];

// Validaciones para obtener el carrito
export const validarObtenerCarrito = [
    param("usuarioId")
        .notEmpty()
        .withMessage("El usuarioId es obligatorio")
        .isMongoId()
        .withMessage("El usuarioId debe ser un ID válido de MongoDB"),
];

// Validaciones para vaciar el carrito
export const validarVaciarCarrito = [
    param("usuarioId")
        .notEmpty()
        .withMessage("El usuarioId es obligatorio")
        .isMongoId()
        .withMessage("El usuarioId debe ser un ID válido de MongoDB"),
];

// Validaciones para eliminar un producto del carrito
export const validarEliminarProductoDelCarrito = [
    param("usuarioId")
        .notEmpty()
        .withMessage("El usuarioId es obligatorio")
        .isMongoId()
        .withMessage("El usuarioId debe ser un ID válido de MongoDB"),
    param("productoId")
        .notEmpty()
        .withMessage("El productoId es obligatorio")
        .isMongoId()
        .withMessage("El productoId debe ser un ID válido de MongoDB"),
];

// Validaciones para obtener productos seleccionados
export const validarObtenerProductosSeleccionados = [
    check("ids")
        .isArray({ min: 1 })
        .withMessage("Debe proporcionar un array de IDs válido")
        .custom((value) => value.every((id) => typeof id === "string"))
        .withMessage("Todos los IDs deben ser cadenas de texto válidas"),
];
