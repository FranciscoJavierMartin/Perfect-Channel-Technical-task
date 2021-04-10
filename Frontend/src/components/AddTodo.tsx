import React, { useState } from 'react';
import { createTodo } from '../network/todos';

const AddTodo: React.FC = () => {
  const [description, setDescription] = useState<string>('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodo(description);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
