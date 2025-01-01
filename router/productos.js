import express from 'express';
import { 
    agregarProductoController,
    editarProductoController,
    obtenerProductoPorIdController,
    obtenerTodosLosProductosController
} from '../controller/controllerProductos.js';
import { body, param } from 'express-validator';


const router = express.Router();




router.post('/productos/agregar', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    body('categoria').notEmpty().withMessage('La categoría es obligatoria'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número no negativo')
], agregarProductoController);


router.put('/productos/editar/:id', [
    param('id').isMongoId().withMessage('ID no válido'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),
    body('categoria').notEmpty().withMessage('La categoría es obligatoria'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número no negativo'),
], editarProductoController);

router.get('/:id', obtenerProductoPorIdController);

router.get('/', obtenerTodosLosProductosController);



export default router;
