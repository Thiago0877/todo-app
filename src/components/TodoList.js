import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Nuevo estado para errores generales
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null); // Limpiar error previo

      const res = await fetch('http://localhost:3001/todos');
      if (!res.ok) throw new Error('No se pudo cargar los datos');

      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error al cargar todos:', error);
      setError('Error al cargar las tareas. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    setUpdatingId(id);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!res.ok) throw new Error('Error al actualizar');

      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      ));
    } catch (error) {
      console.error('Error al actualizar todo:', error);
      setError('Error al actualizar la tarea.');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;

    setDeletingId(id);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar');

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error al eliminar todo:', error);
      setError('Error al eliminar la tarea.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Cargando tareas...</p>;

  return (
    <div>
      <h2>Mis Todos</h2>

      {error && (
        <div style={{ background: '#ffd6d6', padding: '10px', marginBottom: '10px', borderRadius: '5px', color: '#a94442' }}>
          {error}
        </div>
      )}

      {todos.length === 0 ? (
        <p>No hay tareas. ¡Agrega una nueva!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                disabled={updatingId === todo.id || deletingId === todo.id}
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                disabled={deletingId === todo.id || updatingId === todo.id}
              >
                {deletingId === todo.id ? 'Eliminando...' : 'Eliminar'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
