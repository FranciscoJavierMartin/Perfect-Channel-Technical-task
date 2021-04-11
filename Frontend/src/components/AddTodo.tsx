import React, { useState } from 'react';
import { createTodo } from '../network/todos';
import { useToastContext } from '../store/toast/ToastContext';
import loadTodos from '../store/todo/todoAction';
import { useTodoContext } from '../store/todo/TodoContext';

interface AddTodoProps {}

const AddTodo: React.FC<AddTodoProps> = () => {
  const [description, setDescription] = useState<string>('');
  const { dispatch: todoDispatch } = useTodoContext();
  const addToast = useToastContext();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodo(description)
      .then(() => {
        addToast(`Your task "${description}" has been added successfuly`);
        loadTodos(todoDispatch).catch(() =>
          addToast(
            'Ups, something went wrong when load tasks. Try again.',
            true
          )
        );
      })
      .catch(() =>
        addToast(
          'Ups, something went wrong when your task was added. Try again.',
          true
        )
      );
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder='What you want to achive?'
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default AddTodo;
