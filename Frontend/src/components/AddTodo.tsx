import React, { useState } from 'react';

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          required
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
