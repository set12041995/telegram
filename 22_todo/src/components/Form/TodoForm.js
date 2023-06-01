import React, { useState } from 'react';
import "./TodoForm.css";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title,
      description,
      status: 'pending',
    };

    addTodo(newTodo);

    setTitle('');
    setDescription('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
      className='title'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
      className='description'
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className='create' type="submit">Create Todo</button>
    </form>
  );
};

export default TodoForm;
