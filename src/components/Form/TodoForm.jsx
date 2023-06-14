import React, { useState } from "react";
import Button from "../common/Button/Button";
import "./TodoForm.css";

export default function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const updateTitle = (value) => {
    setTitle(value);
  };

  const updateDescription = (value) => {
    setDescription(value);
  };

  const create = () => {
    console.log(1);
    setTitle("");
    setDescription("");

    addTodo(title, description);
  };

  return (
    <div className="form">
      <input
        className="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
      />
      <input
        className="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => updateDescription(e.target.value)}
      />
      <Button className="create" onClick={create}>
        Create Todo
      </Button>
    </div>
  );
}
