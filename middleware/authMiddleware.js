// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "No autorizado, token no encontrado",
                data: {}
            });
        }
        const tokenData = jwt.verify(token, process.env.JWT_SECRET || "unaclavesecreta");
        if (!tokenData) {
            return res.status(401).json({
                status: "error",
                message: "No autorizado, token inválido",
                data: {}
            });
        }
        next();
    } catch (error) {
        console.error("Error en la verificación del token: ", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor al verificar el token",
            data: {}
        });
    }
};
