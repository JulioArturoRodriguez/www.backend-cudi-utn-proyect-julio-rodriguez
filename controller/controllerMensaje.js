import Message from "../model/mensaje.js";

export const receiveMessageController = async (req, res) => {
    try {
        const { mensaje } = req.body;

        if (!mensaje) {
            return res.status(400).json({
                status: "error",
                message: "No se recibió el mensaje",
                data: {}
            });
        }

        const newMessage = new Message({ mensaje });
        await newMessage.save();

        return res.status(200).json({
            status: "success",
            message: "¡Gracias por tu mensaje! Ha sido recibido correctamente.",
            data: { recibido: mensaje }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor",
            data: {}
        });
    }
};
