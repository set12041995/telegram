import React, { useState } from 'react';
import "./App.css";
import TodoForm from "./components/Form/TodoForm";
import TodoTable from "./components/Table/TodoTable";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleStatus = (id) => {
    const taskToUpdate = todos.find((todo) => todo.id === id);
    if (taskToUpdate) {
      const newStatus = taskToUpdate.status === 'pending' ? 'completed' : 'pending';
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo Application</h1>
        <TodoForm addTodo={addTodo} />
        <TodoTable todos={todos} toggleStatus={toggleStatus} deleteTodo={deleteTodo} updateTodos={setTodos} />
      </header>
    </div>
  );
}

export default App;