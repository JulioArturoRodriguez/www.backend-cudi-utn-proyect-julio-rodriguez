
// controllers/controllerMensaje.js
import Message from '../models/Message.js'; 

export const receiveMessageController = async (req, res) => {
    try {
      
        const { mensaje } = req.body;

    
        if (!mensaje) {
            return res.status(400).json({
                status: "error",
                menssage: "No se recibió el mensaje",
                data: {}
            });
        }

        const newMessage = new Message({
            mensaje: mensaje
        });

        await newMessage.save();

        return res.status(200).json({
            status: "success",
            menssage: "¡Gracias por tu mensaje! Ha sido recibido correctamente.",
            data: { recibido: mensaje }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            menssage: "Error en el servidor",
            data: {}
        });
    }
};
