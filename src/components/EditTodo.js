// src/pages/EditTodo.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({ title: '', completed: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const res = await fetch(`http://localhost:3001/todos/${id}`);
        const data = await res.json();
        setTodo(data);
        setLoading(false);
      } catch (err) {
        alert('Error al cargar el todo');
      }
    };

    loadTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo)
      });

      if (res.ok) {
        navigate('/todos');
      } else {
        alert('Error al guardar los cambios');
      }
    } catch (err) {
      alert('Error en la edición');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Todo</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={todo.completed}
              onChange={handleChange}
            />
            Completado
          </label>
        </div>

        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={() => navigate('/todos')}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditTodo;
