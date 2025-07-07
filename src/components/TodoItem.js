import React from 'react';
import { Link } from 'react-router-dom';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      {/* Checkbox para marcar como completado/pendiente */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />

      {/* Título con estilo tachado si está completado */}
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.title}
      </span>

      {/* Botón para editar */}
      <Link to={`/edit/${todo.id}`}>
        <button style={{ backgroundColor: '#ffc107', color: 'black' }}>
          Editar
        </button>
      </Link>

      {/* Botón para eliminar */}
      <button onClick={() => onDelete(todo.id)}>Eliminar</button>
    </li>
  );
}

export default TodoItem;
