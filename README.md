# ProyectoJC Backend

Introducción del proyecto.

## Tecnologías utilizadas

- [Express]() Un framework rápido y minimalista de Node.js para construir aplicaciones web y APIs RESTful de manera eficiente y modular.
- [Handlebars]() Un motor de plantillas que facilita la generación de vistas HTML dinámicas, permitiendo crear una interfaz de usuario atractiva y personalizada.
- [MongoDB y Mongoose]() Una combinación poderosa para almacenar y manipular datos en una base de datos NoSQL flexible y escalable, con Mongoose proporcionando una capa de abstracción para una interacción más sencilla.
- [Passport y JSON Web Tokens (JWT)]() Herramientas para la autenticación y autorización de usuarios, con Passport ofreciendo múltiples estrategias y JWT como estándar para la creación de tokens de acceso.
- [Otras dependencias]() Diversas dependencias como bcrypt, connect-mongo, connect-mongodb-session y nodemailer para los correos electronicos, que complementan el proyecto y brindan características adicionales para una aplicación segura y funcional.

## Instalación

1. Clona este repositorio: `git clone https://github.com/JcDieguez/ProyectoJC-Backend`
2. Ve al directorio del proyecto: `cd ProyectoJC-Backend - cd src`
3. Instala las dependencias: `npm install`

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto.
2. Agrega las siguientes variables de entorno en el archivo `.env`. Asegúrate de definir variables como PORT, MONGODB_URI, JWT_SECRET, entre otras, según las necesidades de tu entorno.
- MONGO_URI=mongodb+srv://juancruz:123@proyectojc.12yzmzn.mongodb.net/proyectoJS?retryWrites=true&w=majority
- MONGO_URL=mongodb+srv://juancruz:123@proyectojc.12yzmzn.mongodb.net/proyectoJS?retryWrites=true&w=majority
- SESSION_SECRET=aspdiasc903ok1pkc
- JWT_SECRET=aspdiasc903ok1pkc
- TWILIO_ACCOUNT_SID=AC802d8865b5c929e1c60ecdafc2124a42
- TWILIO_AUTH_TOKEN=1192968b181aef618fd36f0e2977ba3c
- JWT_COOKIE=aspdiasc903ok1pkc
- PORT=8080

## Uso

1. Ejecuta el comando node app.js para iniciar el servidor backend.
2. Accede a la API utilizando http://localhost:8080/
3. El usuario ADMIN para cargar un producto http://localhost:8080/cargaProducto

## Contacto
Si tienes alguna pregunta o sugerencia relacionada con este proyecto, no dudes en contactarme a través de juancruzdieguez95@gmail.com ¡Estoy aquí para ayudar!
