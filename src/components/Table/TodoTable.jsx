import React from "react";
import Row from "./components/Row/index";
import Button from "./../common/Button/Button";
import "./style.css";

export default function TodoTable({
  todoList,
  updateStatus,
  changeFilter,
  deleteTodo,
  changeTodo,
}) {
  return (
    <>
      <div className="headerTable">
        <div>
          <Button color="Blue" onClick={(e) => changeFilter(e)}>
            All
          </Button>
        </div>
        <div>
          <Button color="red" onClick={(e) => changeFilter(e)}>
            Pending
          </Button>
        </div>
        <div>
          <Button color="Green" onClick={(e) => changeFilter(e)}>
            Completed
          </Button>
        </div>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th className="todo-table-header">
              {/* <input type="checkbox" /> */}
            </th>
            <th className="todo-table-header">Name</th>
            <th className="todo-table-header">Description</th>
            <th className="todo-table-header">Status</th>
            <th className="todo-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoList.length
            ? todoList.map((el) => {
                return (
                  <Row
                    row={el}
                    key={el.id}
                    deleteTodo={deleteTodo}
                    changeTodo={changeTodo}
                    updateStatus={updateStatus}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
}
