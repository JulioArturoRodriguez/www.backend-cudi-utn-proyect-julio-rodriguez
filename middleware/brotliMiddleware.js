// middlewares/brotliMiddleware.js
import compression from "compression";
import zlib from "zlib";

export const brotliMiddleware = compression({
    filter: (req, res) => {
        try {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        } catch (error) {
            console.error("Error aplicando la compresión: ", error);
            return false;
        }
    },
    threshold: 1024, // Comprimir solo respuestas mayores a 1 KB
    brotli: {
        enabled: true,
        params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11, // Máxima calidad
        },
    },
});
