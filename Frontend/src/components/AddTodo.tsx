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
            'Ups, something went wrong when load tasks. Please try again.',
            true
          )
        );
      })
      .catch(() =>
        addToast(
          'Ups, something went wrong when your task was added. Please try again.',
          true
        )
      )
      .finally(() => {
        setDescription('');
      });
  };

  return (
    <div className='row justify-content-between text-white mb-3 mx-1 my-4'>
      <form onSubmit={submitHandler} className='input-group'>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder='What you want to achieve?'
          className='form-control'
        />
        <div className='input-group-append'>
          <button className='btn btn-primary pl-4 pr-4' type='submit'>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
