
import mongoose from 'mongoose';

const carritoSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Mejora el rendimiento de las búsquedas
    },
    productos: [{
        productoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1 // Asegura que la cantidad sea al menos 1
        }
    }]
}, { timestamps: true });

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;

