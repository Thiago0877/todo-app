// src/pages/TodoList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | completed | pending

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      alert('Error al cargar los todos');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        ));
      }
    } catch (error) {
      alert('Error al actualizar');
    }
  };

  const deleteTodo = async (id) => {
    if (!window.confirm('¿Eliminar este todo?')) return;

    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      alert('Error al eliminar');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Mis Todos</h2>

      <div style={{ marginBottom: '15px' }}>
        <Link to="/add">+ Agregar Nuevo Todo</Link>
      </div>

      {/* Filtros */}
      <div style={{ marginBottom: '20px' }}>
        <label>Filtrar por estado: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="completed">Completados</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      {filteredTodos.length === 0 ? (
        <p>No hay tareas en esta categoría.</p>
      ) : (
        <ul>
          {filteredTodos.map(todo => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </span>
              <Link to={`/edit/${todo.id}`}>
                <button style={{ marginLeft: '10px' }}>Editar</button>
              </Link>
              <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
