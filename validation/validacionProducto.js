import { body, param } from "express-validator";

// Precios fijos predefinidos para cada producto
const preciosFijos = {
  'Producto 1': 100,
  'Producto 2': 200,
  'Producto 3': 300,
  'Producto 4': 400,
  'Producto 5': 500,
  'Producto 6': 600,
  'Producto 7': 700,
  'Producto 8': 800,
  'Producto 9': 900,
};

// Validación para POST (Crear producto)
export const validationPostProducto = [
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser un texto")
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),

  body("descripcion")
    .isString()
    .withMessage("La descripción debe ser un texto")
    .isLength({ min: 1, max: 500 })
    .withMessage("La descripción debe tener entre 1 y 500 caracteres"),

  body("precio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .custom(value => {
      // Validar que el precio sea uno de los precios predefinidos
      const productoNombre = body("nombre").value;
      if (preciosFijos[productoNombre] && preciosFijos[productoNombre] !== value) {
        throw new Error(`El precio debe ser ${preciosFijos[productoNombre]} para el producto ${productoNombre}`);
      }
      return true;
    }),

  body("cantidad")
    .isInt({ min: 0 })
    .withMessage("La cantidad debe ser un número entero positivo"),
];

// Validación para PUT (Actualizar producto)
export const validationPutProducto = [
  param("id")
    .isMongoId()
    .withMessage("El ID del producto debe ser un ID válido de MongoDB"),

  body("nombre")
    .optional()  // El nombre es opcional en una actualización
    .isString()
    .withMessage("El nombre debe ser un texto")
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),

  body("descripcion")
    .optional()  // La descripción es opcional en una actualización
    .isString()
    .withMessage("La descripción debe ser un texto")
    .isLength({ min: 1, max: 500 })
    .withMessage("La descripción debe tener entre 1 y 500 caracteres"),

  body("precio")
    .optional()  // El precio es opcional en una actualización
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .custom(value => {
      // Validar que el precio sea uno de los precios predefinidos
      const productoNombre = body("nombre").value;
      if (preciosFijos[productoNombre] && preciosFijos[productoNombre] !== value) {
        throw new Error(`El precio debe ser ${preciosFijos[productoNombre]} para el producto ${productoNombre}`);
      }
      return true;
    }),

  body("cantidad")
    .optional()  // La cantidad es opcional en una actualización
    .isInt({ min: 0 })
    .withMessage("La cantidad debe ser un número entero positivo"),
];
