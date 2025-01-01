import { LoginUser } from "../service/serviceLogin.js";
import { crearUsuario } from "../service/serviceUsuario.js";
import { RefreshToken } from "../service/serviceUsuario.js";
import User from '../model/usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from "express-validator";

export const LoginUserController = async (req, res) => {
    // Validación de errores en los parámetros de la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;  // Obtener email y password del cuerpo de la solicitud

    try {
        // Buscar al usuario en la base de datos usando el email
        console.log('Buscando usuario con email:', email);
        const user = await User.findOne({ email });

        // Si el usuario no existe
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Si el usuario existe, mostrar detalles
        console.log('Usuario encontrado:', user);

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Contraseña ingresada:', password);
        console.log('Contraseña almacenada (hashed):', user.password);

        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si la contraseña es correcta, generar un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });  // Puedes configurar un refresh token con más duración

        // Mostrar los tokens generados
        console.log('Access Token generado:', token);
        console.log('Refresh Token generado:', refreshtoken);

        // Responder con el token y el refresh token
        res.status(200).json({
            status: "success",
            message: "Usuario logueado",
            data: { accesstoken: token, refreshtoken, user: user.username }  // Corregido "menssage" por "message"
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            data: {}
        });
    }
};

export const RegisterUserController = async (req, res) => {
    console.log("Solicitud recibida en RegisterUserController"); // Para verificar que la función se está llamando
    console.log("Datos recibidos:", req.body); // Muestra los datos recibidos en el cuerpo de la solicitud

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Errores de validación:", errors.array()); // Muestra errores de validación si los hay
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        username,
        nombre,
        apellido,
        email,
        password,
        tarjeta,
        dni,
        celular,
        preguntaSeguridad,
        respuestaSeguridad,
        edad,
        fechaNacimiento,
    } = req.body;

    if (
        !username ||
        !nombre ||
        !apellido ||
        !email ||
        !password ||
        !tarjeta ||
        !dni ||
        !celular ||
        !preguntaSeguridad ||
        !respuestaSeguridad ||
        !edad ||
        !fechaNacimiento
    ) {
        console.log("Faltan campos obligatorios en la solicitud"); // Log si faltan campos
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Usuario ya registrado con el email:", email); // Log si el usuario ya existe
            return res.status(409).json({ message: 'El usuario ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Contraseña encriptada correctamente"); // Log para verificar que la contraseña fue encriptada

        const newUser = new User({
            username,
            nombre,
            apellido,
            email,
            password: hashedPassword,
            tarjeta,
            dni,
            celular,
            preguntaSeguridad,
            respuestaSeguridad,
            edad,
            fechaNacimiento,
        });

        await newUser.save();
        console.log("Usuario guardado en la base de datos:", newUser); // Log para verificar que el usuario fue guardado

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshtoken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        console.log("Tokens generados correctamente:", { token, refreshtoken }); // Log para verificar los tokens

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado y logueado exitosamente',
            data: {
                username: newUser.username,
                email: newUser.email,
                nombre: newUser.nombre,
                apellido: newUser.apellido,
                fechaNacimiento: newUser.fechaNacimiento,
                tarjeta: newUser.tarjeta,
                dni: newUser.dni,
                celular: newUser.celular,
                preguntaSeguridad: newUser.preguntaSeguridad,
                respuestaSeguridad: newUser.respuestaSeguridad,
                edad: newUser.edad
            },
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error); // Log del error en la terminal
        res.status(500).json({
            status: 'error',
            message: 'Error en el servidor',
            data: {},
        });
    }
};



export const RefreshTokenController = async (req, res) => {
    try {
        // Obtenemos el refresh token de las cabeceras
        const refreshtoken = req.headers["x-refresh-token"];

        // Verificamos que el refresh token esté presente
        if (!refreshtoken) {
            return res.status(400).json({
                status: "error",
                message: "Falta el refresh token",  // Corregido "menssage" por "message"
                data: {}
            });
        }

        // Intentamos generar un nuevo access token usando el refresh token
        const accesstoken = await RefreshToken(refreshtoken);

        if (!accesstoken) {
            return res.status(400).json({
                status: "error",
                message: "El refresh token es inválido o ha expirado",  // Corregido "menssage" por "message"
                data: {}
            });
        }

        // Respondemos con el nuevo access token
        return res.status(200).json({
            status: "success",
            message: "Token actualizado con éxito",  // Corregido "menssage" por "message"
            data: { accesstoken }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",  // Corregido "menssage" por "message"
            data: {}
        });
    }
};
