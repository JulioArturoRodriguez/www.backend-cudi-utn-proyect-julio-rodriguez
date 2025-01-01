// service/serviceUsuario.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Servicio para refrescar el token
export const RefreshToken = async (refreshToken) => {
    try {
        // Verificar si el refresh token es válido
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'unaclaverelosecreta');

        // Verificar si el usuario existe
        const user = await User.findById(decoded.userId);
        if (!user) {
            return null;  // Usuario no encontrado
        }

        // Generar un nuevo access token
        const newAccessToken = generateAccessToken(user._id);
        return newAccessToken;  // Retorna el nuevo access token

    } catch (error) {
        console.error(error);
        return null;  // Error al verificar el refresh token
    }
};
