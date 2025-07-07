// src/components/TodoItem.jsx
import { Link } from 'react-router-dom';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id, todo.completed)}
      />

      <span style={{
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}>
        {todo.title}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>

      <Link to={`/edit/${todo.id}`}>
        <button>Editar</button>
      </Link>
    </li>
  );
}

export default TodoItem;
