import React, { useState } from 'react';
import { createTodo } from '../network/todos';
import loadTodos from '../store/todo/todoAction';
import { useTodoContext } from '../store/todo/TodoContext';

interface AddTodoProps {}

const AddTodo: React.FC<AddTodoProps> = () => {
  const [description, setDescription] = useState<string>('');
  const { dispatch: todoDispatch } = useTodoContext();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodo(description).then(() => {
      loadTodos(todoDispatch);
    });
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
