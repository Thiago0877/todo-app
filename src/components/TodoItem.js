function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />

      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          flex: 1
        }}
      >
        {todo.title}
      </span>

      <button onClick={() => onDelete(todo.id)}>Eliminar</button>
    </li>
  );
}

export default TodoItem;
