# API de Gestión de Usuarios, Productos y Carrito de Compras

Este proyecto proporciona una API para gestionar usuarios, productos y carritos de compras en una tienda en línea. La API está construida con **Express** y permite realizar operaciones como el registro de usuarios, autenticación, gestión de productos y manejo del carrito de compras.

## Funcionalidades

### 1. Gestión de Usuarios

#### **Registrar un usuario**
- **Ruta**: `POST /register`
- **Descripción**: Permite registrar un nuevo usuario en el sistema.
- **Validaciones**:
  - `username`: Requerido.
  - `nombre`: Requerido.
  - `apellido`: Requerido.
  - `password`: Requerido.
  - `email`: Debe ser un correo válido.
  - `fechaNacimiento`: Requerido.
  - `tarjeta`: Requerido.
  - `dni`: Requerido.
  - `celular`: Requerido.
  - `preguntaSeguridad`: Requerido.
  - `respuestaSeguridad`: Requerido.
  - `edad`: Debe ser un número mayor a 0.
- **Controlador**: `RegisterUserController`.

#### **Login de usuario**
- **Ruta**: `POST /login`
- **Descripción**: Permite hacer login de un usuario en el sistema.
- **Validaciones**:
  - `email`: Requerido.
  - `password`: Requerido.
- **Controlador**: `LoginUserController`.

#### **Refrescar token**
- **Ruta**: `POST /refresh-token`
- **Descripción**: Permite refrescar el token de autenticación del usuario.
- **Controlador**: `RefreshTokenController`.

---

### 2. Gestión de Productos

#### **Agregar un producto**
- **Ruta**: `POST /productos/agregar`
- **Descripción**: Permite agregar un nuevo producto al sistema.
- **Validaciones**:
  - `nombre`: Requerido.
  - `precio`: Debe ser un número mayor a 0.
  - `categoria`: Requerido.
  - `stock`: Debe ser un número no negativo.
- **Controlador**: `agregarProductoController`.

#### **Editar un producto**
- **Ruta**: `PUT /productos/editar/:id`
- **Descripción**: Permite editar un producto existente en el sistema.
- **Validaciones**:
  - `id`: Debe ser un ID válido de MongoDB.
  - `nombre`: Requerido.
  - `precio`: Debe ser un número mayor a 0.
  - `categoria`: Requerido.
  - `descripcion`: Requerido.
  - `stock`: Debe ser un número no negativo.
- **Controlador**: `editarProductoController`.

#### **Obtener un producto por ID**
- **Ruta**: `GET /:id`
- **Descripción**: Permite obtener un producto específico por su ID.
- **Controlador**: `obtenerProductoPorIdController`.

#### **Obtener todos los productos**
- **Ruta**: `GET /`
- **Descripción**: Permite obtener todos los productos registrados en el sistema.
- **Controlador**: `obtenerTodosLosProductosController`.

---

### 3. Gestión del Carrito de Compras

#### **Agregar producto al carrito**
- **Ruta**: `POST /carrito/agregar`
- **Descripción**: Permite agregar un producto al carrito de un usuario.
- **Validaciones**:
  - `username`: Requerido.
  - `nombre`: Requerido.
- **Controlador**: `agregarProductoAlCarrito`.
- **Manejo de errores**:
  - Si falta el `username` o `nombre`, responde con un error 400.
  - Si ocurre un error interno, responde con un error 500.

#### **Eliminar producto del carrito**
- **Ruta**: `DELETE /carrito/eliminar`
- **Descripción**: Permite eliminar un producto del carrito de un usuario.
- **Validaciones**:
  - `username`: Requerido.
  - `nombre`: Requerido.
- **Controlador**: `eliminarProductoDelCarrito`.
- **Manejo de errores**:
  - Si falta el `username` o `nombre`, responde con un error 400.
  - Si ocurre un error interno, responde con un error 500.

---

## Requisitos

Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes componentes:

- **Node.js**: Asegúrate de tener instalada la versión más reciente de Node.js.
- **MongoDB**: Necesitarás una base de datos MongoDB para almacenar los usuarios, productos y carritos.
- **Express**: Framework web para Node.js que facilita la creación de aplicaciones web y APIs.
- **JWT (JSON Web Token)**: Se utiliza para manejar la autenticación y la autorización de los usuarios.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/JulioArturoRodriguez/www.backend-cudi-utn-proyect-julio-rodriguez.git


# Estructura de Directorios

Este es el esquema de directorios del backend del proyecto. Está organizado para facilitar el mantenimiento, escalabilidad y claridad en la lógica del negocio.

```plaintext
/project-root
├── /controller
│   ├── carritoController.js        # Lógica para la gestión del carrito de compras
│   ├── controllerMensaje.js        # Lógica para la gestión de mensajes
│   ├── controllerProductos.js      # Lógica para la gestión de productos
│   ├── mensajeController.js        # Controlador para los mensajes
│   └── usuarios.js                 # Lógica para la gestión de usuarios
│
├── /logs
│   ├── combined.log                # Registro de logs combinado (información y errores)
│   └── error.log                   # Registro de errores
│
├── /middleware
│   ├── authMiddleware.js           # Middleware para autenticación
│   ├── brotliMiddleware.js         # Middleware para compresión Brotli
│   └── validationMiddleware.js     # Middleware para validaciones generales
│
├── /model
│   ├── carrito.js                  # Modelo para los carritos de compra
│   ├── mensaje.js                  # Modelo para los mensajes
│   ├── producto.js                 # Modelo para los productos
│   └── usuario.js                  # Modelo para los usuarios
│
├── /router
│   ├── carrito.js                  # Rutas relacionadas con el carrito de compras
│   ├── mensaje.js                  # Rutas relacionadas con los mensajes
│   ├── productos.js                # Rutas relacionadas con los productos
│   └── user.js                     # Rutas relacionadas con los usuarios
│
├── /service
│   ├── serviceCompra.js            # Lógica de negocio para la compra
│   ├── serviceLogin.js             # Lógica de negocio para login
│   ├── serviceProducto.js          # Lógica de negocio para productos
│   ├── serviceUsuario.js           # Lógica de negocio para usuarios
│   └── serviceUsuarioNoEncontrado.js # Lógica para el caso de usuario no encontrado
│
├── /util
│   └── utilGenerarToken.js         # Utilidad para generar tokens JWT
│
├── /validation
│   └── validacionProducto.js       # Validaciones relacionadas con los productos
│
├── .env                            # Archivo de configuración de variables de entorno
├── .gitignore                      # Archivos y carpetas que Git debe ignorar
├── combined.log                    # Archivo de log combinado
├── error.log                       # Archivo de log de errores
├── index.js                        # Archivo principal de la aplicación

##INTEGRANTES
#JULIO ARTURO RODRIGUEZ

├── package-lock.json               # Archivo de bloqueo de dependencias
├── package.json                    # Archivo de configuración de npm
└── README.md                       # Archivo de documentación del proyecto

