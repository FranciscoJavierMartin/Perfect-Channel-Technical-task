import React, { useState } from 'react';
import { createTodo } from '../network/todos';
import loadTodos from '../store/todoAction';
import { useTodoContext } from '../store/TodoContext';

interface AddTodoProps {
  forceRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodo: React.FC<AddTodoProps> = ({ forceRefresh }) => {
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
