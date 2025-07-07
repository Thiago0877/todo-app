import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error al cargar los todos:', err));
  }, []);

  return (
    <div>
      <h2>Mis Todos</h2>
      {todos.length === 0 ? (
        <p>No hay tareas pendientes.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.title}
              </span>
              <button>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
