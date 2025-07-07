import React, { useEffect, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  // GET - Obtener todos los todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/todos');
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error al cargar todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // PATCH - Cambiar estado completado
  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (res.ok) {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        ));
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  // DELETE - Eliminar todo
  const deleteTodo = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar esta tarea?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div>
      <h2>Mis Todos</h2>
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
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}>
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
