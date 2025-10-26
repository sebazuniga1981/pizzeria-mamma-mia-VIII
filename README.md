🍕 Pizzería Mamma Mía_VIII

🎯 Objetivo

Implementar autenticación real mediante JSON Web Token (JWT), conectando el frontend en React + Vite con un backend en Node.js/Express.
El proyecto simula un sistema de pedidos de pizzas con login, registro, perfil de usuario y compra protegida.

🚀 Tecnologías utilizadas

Frontend: React + Vite

Librerías:
React Router DOM
React Bootstrap
Context API
ESLint
Backend: Node.js + Express
bcrypt

⚙️ Instalación del proyecto
Clonar el repositorio
git clone https://github.com/sebazuniga1981/pizzeria-mamma-mia-VIII.git
cd pizzeria-mamma-mia-VIII


Por defecto, se abrirá en:

http://localhost:5173

🖥️ Backend (API)

Para usar JWT y las rutas protegidas, necesitas tener corriendo el backend del desafío.

1️⃣ Ubicación del backend

El código se encuentra en la carpeta:

/Material de apoyo - Backend Pizzas

2️⃣ Instalación
npm install

3️⃣ Iniciar el servidor
npm run dev

✅ Cumplimiento de requerimientos del Hito 8
#	Requerimiento	Estado
1	UserContext con login() y register() consumiendo API
2	logout() elimina token y email
3	getProfile() obtiene usuario autenticado
4	LoginPage y RegisterPage usan contexto
5	Profile.jsx muestra email y botón logout
6	Botón Logout en Navigation
7	Cart.jsx envía checkout con token
8	Mensaje de compra exitosa
9	Proyecto corre con backend local
10	Estructura limpia y funcional
🧪 Usuario de prueba

Puedes usar los datos incluidos por defecto en el backend:

{
  "email": "test@test.com",
  "password": "123123"
}