import React from 'react';
import { Todo } from '../models/todo';
import { toggleTodo } from '../network/todos';
import { useToastContext } from '../store/toast/ToastContext';
import loadTodos from '../store/todo/todoAction';
import { useTodoContext } from '../store/todo/TodoContext';

interface TodoListProps {
  todos: Todo[];
  title: string;
  message: string;
  image: string;
  imageAlt: string;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  title,
  message,
  image,
  imageAlt,
}) => {
  const {
    state: { isLoading },
    dispatch: todoDispatch,
  } = useTodoContext();
  const addToast = useToastContext();

  function toggleHandler(todo: Todo) {
    toggleTodo(todo.id)
      .then(() => {
        const message = todo.isCompleted
          ? `You can start to work on "${todo.description}."`
          : `You have complete "${todo.description}". Good job!`;
        addToast(message);
        loadTodos(todoDispatch).catch(() =>
          addToast(
            'Ups, something went wrong when load tasks. Please try again.',
            true
          )
        );
      })
      .catch(() => {
        const message = todo.isCompleted
          ? `Ups, something went wrong when you completed your task. Please try again.`
          : `Ups, something went wrong when you mark as "pending" your task. Please try again.`;
        addToast(message, true);
      });
  }

  return (
    <div className='col-12' data-test={title}>
      <h2 className='text-center'>{title}</h2>
      {isLoading ? (
        <div className='d-flex justify-content-center'>
          <div
            className='spinner-border text-dark'
            role='status'
            style={{ width: '3rem', height: '3rem' }}
          >
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      ) : todos.length === 0 ? (
        <div className='d-flex flex-column align-items-center'>
          <div className='row'>
            <img
              src={`assets/images/${image}.png`}
              alt={imageAlt}
              className='rounded img-fluid mb-2 col-sm-6 offset-sm-3'
            />
          </div>
          <span>{message}</span>
        </div>
      ) : (
        <div className='checkboxes'>
          <ul className='list-unstyled'>
            {todos.map((todo) => (
              <li key={todo.id}>
                <label htmlFor={todo.id}>
                  <input
                    id={todo.id}
                    type='checkbox'
                    checked={todo.isCompleted}
                    onChange={() => toggleHandler(todo)}
                    className='mr-2'
                  />
                  <span
                    className={
                      todo.isCompleted
                        ? 'font-weight-light font-italic text-line-through'
                        : ''
                    }
                  >
                    {todo.description}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
