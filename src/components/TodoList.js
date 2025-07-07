import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TodoItem from '../components/TodoItem';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/todos');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      alert('Error al cargar los todos');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });

      if (res.ok) {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        ));
      }
    } catch (err) {
      alert('Error al actualizar');
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('¿Eliminar este todo?')) return;

    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Mis Todos</h2>
      <Link to="/add">+ Agregar Nuevo Todo</Link>

      {todos.length === 0 ? (
        <p>No hay tareas.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todos;
