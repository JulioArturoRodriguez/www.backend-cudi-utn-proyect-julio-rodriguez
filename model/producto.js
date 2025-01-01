import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0 // Validación para evitar precios negativos
    },
    categoria: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0 // Validación para evitar valores negativos en el stock
    }
}, { timestamps: true });


const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
