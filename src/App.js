// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Todos from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/todos">Mis Todos</Link>
          <Link to="/add">Agregar Todo</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
