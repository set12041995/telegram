import React from "react";
import "./TodoTable.css";

const TodoTable = ({ todos, toggleStatus, deleteTodo, updateTodos }) => {
  const statusChange = (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    toggleStatus(id, newStatus);
  };

  const changeDescription = (id) => {
    const updatedDescription = prompt("Enter the new description:");
    if (updatedDescription) {
      editTodo(id, updatedDescription);
    }
  };

  const editTodo = (id, updatedDescription) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, description: updatedDescription };
      }
      return todo;
    });
    updateTodos(updatedTodos);
  };

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th className="todo-table-header">
            <input type="checkbox" />
          </th>
          <th className="todo-table-header">Name</th>
          <th className="todo-table-header">Description</th>
          <th className="todo-table-header">Status</th>
          <th className="todo-table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>
              {todo.status === "pending" ? (
                <button
                  className="pending"
                  onClick={() => toggleStatus(todo.id)}
                >
                  Pending
                </button>
              ) : (
                <button
                  className="completed"
                  onClick={() => statusChange(todo.id, todo.status)}
                >
                  Completed
                </button>
              )}
            </td>
            <td>
              <button
                className="edit"
                onClick={() => changeDescription(todo.id)}
              >
                Edit
              </button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
