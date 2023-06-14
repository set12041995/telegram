import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/Form/TodoForm";
import TodoTable from "./components/Table/TodoTable";
import API from "./components/Api/Api";

function App() {
  const [state, setTodos] = useState([]);
  const [dataToRender, setDataToRender] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    API.getTodos(setTodos).then((res) => setTodos([...res]));
  }, []);

  useEffect(() => {
    if (filter === "Pending") {
      const pendings = state.filter((el) => !el.completed);
      setDataToRender([...pendings]);
    } else if (filter === "Completed") {
      const completed = state.filter((el) => el.completed);
      setDataToRender([...completed]);
    } else {
      setDataToRender(state);
    }
  }, [filter, state]);

  const deleteTodo = (todo) => {
    API.deleteTodo(todo).then((res) => {
      const updatedTodos = state.filter((el) => el.id !== todo.id);
      setTodos(updatedTodos);
    });
  };

  const updateStatus = (element) => {
    API.updateStatus(element).then((res) => {
      const stateToUpdate = state.reduce((acc, el) => {
        if (el.id === element.id) {
          acc.push(res);
          return acc;
        } else {
          acc.push(el);
          return acc;
        }
      }, []);
      setTodos([...stateToUpdate]);
    });
  };

  const addTodo = (title, description) => {
    API.addTodo(title, description).then((res) => {
      setTodos([...state, res]);
    });
  };

  const changeFilter = (value) => {
    setFilter(value.target.textContent);
  };

  const changeTodo = (row) => {
    const changeTitle = prompt("Enter the new Title:");
    const changeDescription = prompt("Enter the new description:");
    if (changeDescription && changeTitle) {
      API.editTodo(row, changeTitle, changeDescription).then((res) => {
        const updatedTodos = state.map((el) => {
          if (el.id === res.id) {
            return res;
          }
          return el;
        });
        setTodos(updatedTodos);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo Application</h1>
        <TodoForm addTodo={addTodo} />
        <TodoTable
          todoList={dataToRender}
          changeFilter={changeFilter}
          deleteTodo={deleteTodo}
          updateStatus={updateStatus}
          changeTodo={changeTodo}
        />
      </header>
    </div>
  );
}

export default App;
