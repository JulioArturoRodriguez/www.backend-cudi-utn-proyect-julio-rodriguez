
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Longitud mínima de la contraseña
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => !isNaN(Date.parse(value)), // Validar que sea una fecha válida
            message: "La fecha de nacimiento debe ser una fecha válida."
        }
    },
    tarjeta: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    celular: {
        type: Number,
        required: true
    },
    preguntaSeguridad: {
        type: String,
        required: true
    },
    respuestaSeguridad: {
        type:String ,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
