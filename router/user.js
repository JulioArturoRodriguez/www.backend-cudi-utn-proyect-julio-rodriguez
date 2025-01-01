import express from 'express';
import { RegisterUserController, LoginUserController, RefreshTokenController } from '../controller/usuarios.js';
import { body } from 'express-validator';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', [
    body('username').notEmpty().withMessage('Username es requerido'),
    body('nombre').notEmpty().withMessage('nombre es requerido'),
    body('apellido').notEmpty().withMessage('apellido es requerido'),
    body('password').notEmpty().withMessage('Password es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('fechaNacimiento').notEmpty().withMessage('Fecha de nacimiento es requerida'),
    body('tarjeta').notEmpty().withMessage('Número de tarjeta es requerido'),
    body('dni').notEmpty().withMessage('DNI es requerido'),
    body('celular').notEmpty().withMessage('Celular es requerido'),
    body('preguntaSeguridad').notEmpty().withMessage('Pregunta de seguridad es requerida'),
    body('respuestaSeguridad').notEmpty().withMessage('Respuesta de seguridad es requerida'),
    body('edad').isInt({ gt: 0 }).withMessage('Edad debe ser un número mayor a 0')
], RegisterUserController);

// Ruta para hacer login
router.post('/login', [
    body('email').notEmpty().withMessage('email es requerido'),
    body('password').notEmpty().withMessage('Password es requerido')
], LoginUserController);



// Ruta para refrescar el token
router.post('/refresh-token', RefreshTokenController);

export default router;
