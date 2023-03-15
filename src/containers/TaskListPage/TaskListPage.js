import { useState, useEffect } from 'react';
import './TaskListPage.css';

export const TaskListPage = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);

  const addTodo = () => {
    if (todo !== '') {
      setTodos([...todos, todo]);
      setTodo('');
    }
  };

  const removeTodo = (text) => {
    const newTodos = todos.filter((todo) => todo !== text);
    setTodos(newTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <h1>Mani uzdevumi</h1>
      <div className="input-wrapper">
        <input
          type="text"
          name="todo"
          value={todo}
          placeholder="Uzraksti jaunu uzdevumu"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button className="add-button" onClick={addTodo}>
          + Pievienot
        </button>
      </div>
      {todos?.length > 0 ? (
        <ul className="todo-list">
          {todos.map((entry, index) => (
            <div className="todo" key={index}>
              <li>{entry}</li>
              <button
                className="delete-button"
                onClick={() => {
                  removeTodo(entry);
                }}
              >
                ✕ Dzēst
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>nav atrasts neviens uzdevums</p>
        </div>
      )}
    </div>
  );
};
