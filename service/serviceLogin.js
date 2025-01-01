import jwt from 'jsonwebtoken';
import User from '../model/usuario.js';


export const LoginUser = async (email, password) => {
    try {
        // Buscar al usuario por su nombre de usuario
        const user = await User.findOne({ email });
        if (!user) {
            return { accesstoken: null, refreshtoken: null }; // Usuario no encontrado
        }

        // Comparar la contraseña ingresada con la almacenada (encriptada)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { accesstoken: null, refreshtoken: null }; // Contraseña incorrecta
        }

        // Generar el token de acceso y refresco (usando JWT)
        const accesstoken = generateAccessToken(user._id);  // Función para generar el token de acceso
        const refreshtoken = generateRefreshToken(user._id);  // Función para generar el token de refresco

        return { accesstoken, refreshtoken };

    } catch (error) {
        console.error(error);
        return { accesstoken: null, refreshtoken: null };  // Error en el login
    }
};

// Función para generar el token de acceso
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'unaclavesecreta', { expiresIn: '1h' });
};

// Función para generar el token de refresco
const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || 'unaclaverelosecreta', { expiresIn: '7d' });
};
