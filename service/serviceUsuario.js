import User from '../model/usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refreshsecretkey';

export const crearUsuario = async (username, email, password, fechaNacimiento, tarjeta, dni, celular, preguntaSeguridad, respuestaSeguridad, edad, nombre, apellido) => {
    const usuarioExistente = await User.findOne({ $or: [{ username }, { email }] });
    if (usuarioExistente) {
        throw new Error('El usuario o el correo ya están registrados');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
        username,
        email,
        password: hashedPassword,
        fechaNacimiento,
        tarjeta,
        dni: Number(dni), // Asegúrate de que DNI se guarde como número
        celular: Number(celular), // Asegúrate de que celular se guarde como número
        preguntaSeguridad,
        respuestaSeguridad,
        edad: Number(edad), // Asegúrate de que edad se guarde como número
        nombre,
        apellido
    });

    await nuevoUsuario.save();
    return nuevoUsuario;
};

export const autenticarUsuario = async (email, password) => {
    const usuario = await User.findOne({ email });
    if (!usuario) {
        throw new Error('Correo o contraseña incorrectos');
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) {
        throw new Error('Correo o contraseña incorrectos');
    }

    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1h' });
    return token;
};

export const obtenerUsuarioPorId = async (userId) => {
    return await User.findById(userId);
};

export const RefreshToken = async (refreshtoken) => {
    try {
        // Verificamos el refresh token
        const decoded = jwt.verify(refreshtoken, JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id); // Encontramos al usuario

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const accesstoken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return accesstoken;
    } catch (error) {
        console.log(error);
        return null; 
    }
};