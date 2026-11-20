# PaperCraft — E-commerce de Papelería (MERN)

Aplicación web full-stack de comercio electrónico para una papelería, desarrollada con el stack MERN (MongoDB, Express, React y Node.js). Incluye panel administrativo y seguimiento de pedidos en tiempo real mediante WebSockets.

## Características principales
- **Autenticación y roles:** Registro e inicio de sesión de usuarios con gestión de cuentas.
- **Catálogo y carrito:** Exploración de productos por categoría, lista de favoritos y carrito de compras.
- **Pedidos en tiempo real:** Creación, consulta y cancelación de órdenes con notificaciones instantáneas mediante Socket.IO (`emitNewOrderStatus`) sin recargar la página.
- **Panel administrativo:** Gestión de productos, categorías, carga de imágenes y control diario de órdenes (`DailyOrder`).

## Stack tecnológico
- **Frontend:** React 18, Vite 6, React Router 7, Socket.IO Client.
- **Backend:** Node.js, Express 4, Socket.IO 4, Mongoose 8, Express FileUpload.
- **Base de datos:** MongoDB.

## Arquitectura y modelos de datos
El sistema separa cliente y servidor comunicándose vía API REST y WebSockets:
- **Modelos principales (Mongoose):** `User`, `Product`, `Category`, `Order`, `DailyOrder` y `Favorite`.
- **Endpoints clave:**
  - `POST /signup` y `POST /login` — Registro y autenticación.
  - `POST /account` — Consulta de órdenes del usuario.
  - `GET /orders/pending` — Listado de pedidos pendientes.
  - `DELETE /orders/cancel/:id` — Cancelación de pedido con actualización en tiempo real.
  - Rutas CRUD para productos, categorías, carrito y favoritos.

## Instalación local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/cbas-o7/pagina-papeleria-mern.git](https://github.com/cbas-o7/pagina-papeleria-mern.git)