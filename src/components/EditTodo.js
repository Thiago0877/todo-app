import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`http://localhost:3001/todos/${id}`);
        const data = await res.json();
        setTodo(data);
      } catch (error) {
        alert('Error al cargar el todo');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!todo) return <p>No se encontró el todo.</p>;

  return (
    <div>
      <h2>Editar Todo</h2>
      <p><strong>ID:</strong> {todo.id}</p>
      <p><strong>Título actual:</strong> {todo.title}</p>
      <p><strong>Estado:</strong> {todo.completed ? 'Completado' : 'Pendiente'}</p>

      <button onClick={() => navigate('/todos')}>Volver</button>
    </div>
  );
}

export default EditTodo;
