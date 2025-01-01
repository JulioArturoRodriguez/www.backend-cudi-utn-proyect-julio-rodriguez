import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './config/config.js';
import productRoutes from './router/productos.js';
import routerMensaje from './router/mensaje.js';
import routerUser from './router/user.js';
import router from './router/carrito.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: 'http://localhost:5176', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true  
}));





// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/productos', productRoutes);
app.use('/mensajes', routerMensaje);
app.use('/usuario', routerUser);
app.use('/carrito', router);

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).send('<h1>Recurso solicitado no se pudo encontrar en el servidor</h1>');
});


async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    logger.info('Conectado a MongoDB');

    app.listen(PORT, () => {
      logger.info(`Servidor funcionando en el puerto ${PORT}`);
    });
  } catch (error) {
    logger.error('Error al iniciar el servidor:', error.message);
  }
}

startServer();

