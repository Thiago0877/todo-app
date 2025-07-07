# 📝 Todo List con React + JSON Server

Aplicación sencilla de gestión de tareas (Todo List) usando React, React Router y JSON Server como API REST falsa.

---

## 🚀 Funcionalidades implementadas

✅ Navegación entre páginas (`/`, `/todos`, `/add`)  
✅ Listado de tareas desde API  
✅ Crear nuevos todos con formulario  
✅ Marcar tareas como completadas o pendientes  
✅ Eliminar tareas  
✅ Validación de formularios  
✅ Estados de carga (`loading`)  
✅ Manejo básico de errores (`try/catch`)  
✅ Componentes reutilizables (`TodoItem`)  
✅ Código refactorizado y modular  

---

## 📁 Estructura del proyecto

src/
├── components/
│ ├── AddTodo.jsx
│ ├── Home.jsx
│ ├── TodoItem.jsx
│ └── Todos.jsx
├── App.jsx
├── App.css
└── main.jsx


---

## ⚙️ Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/todo-app.git
cd todo-app
2. Instalar dependencias
bash
 

npm install
3. Instalar JSON Server (API local)
bash
 

npm install -g json-server
4. Crear archivo db.json
En la raíz del proyecto, crea el archivo db.json con el siguiente contenido:

json
 

{
  "todos": [
    {
      "id": 1,
      "title": "Aprender React",
      "completed": false
    },
    {
      "id": 2,
      "title": "Hacer ejercicio",
      "completed": true
    }
  ]
}
5. Agregar los scripts al package.json
json

"scripts": {
  "start": "react-scripts start",
  "server": "json-server --watch db.json --port 3001"
}
▶️ Ejecutar el proyecto
En dos terminales:
bash


# Terminal 1 - Inicia la API REST
npm run server
bash


# Terminal 2 - Inicia la app React
npm start