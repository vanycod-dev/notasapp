# 📒 NotasApp

Aplicación web full-stack para crear, editar y visualizar notas públicas o privadas. Diseñada como parte del aprendizaje de desarrollo web utilizando tecnologías modernas.

---

## 🚀 Tecnologías

### Frontend

- React
- Tailwind CSS

### Backend

- Node.js + Express
- MySQL
- JWT para autenticación
- Bcrypt para encriptar contraseñas

---

## 📂 Estructura del Proyecto

```
notasapp/
├── backend/         # API REST con Express
│   ├── controllers/
│   ├── routes/
│   └── utils/
├── frontend/        # Aplicación React con Tailwind
│   ├── components/
│   ├── pages/
│   └── utils/
└── README.md
```

---

## ⚙️ Funcionalidades

- Registro e inicio de sesión de usuario
- Creación de notas privadas o públicas
- Edición de notas desde un modal estilizado
- Visualización de notas públicas para cualquier usuario
- Notas privadas visibles solo para el autor autenticado

---

## 🛠️ Instalación y uso

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Base de datos

Asegúrate de tener MySQL activo y crea una base de datos con las tablas necesarias. Puedes usar un archivo `schema.sql` o migraciones según tus preferencias.

---

## 📌 Notas adicionales

- Tailwind CSS está configurado según el modo JIT.
- Se utiliza `contentEditable` para la edición rica del contenido.
- El modal de edición bloquea el botón de guardar durante la actualización.

---

## 📅 To-Do / Mejoras futuras

-

---

## 🧑‍💻 Autor

Proyecto creado por [vanycod](https://github.com/vanycod-dev) como parte de su aprendizaje en desarrollo full-stack.

---

## 📜 Licencia

MIT License

Es de uso libre, si te gusto y puedes apoyar con alguna contribución económica estaría agradecido, para mas informes manda correo al perjhoal\@gmail.com
