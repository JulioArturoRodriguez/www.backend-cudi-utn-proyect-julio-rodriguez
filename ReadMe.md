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
   git clone https://github.com/tuusuario/tu-repositorio.git
