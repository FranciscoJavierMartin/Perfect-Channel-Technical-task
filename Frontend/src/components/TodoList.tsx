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
}

const TodoList: React.FC<TodoListProps> = ({ todos, title, message }) => {
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
    <div className='col-md-6 col-12'>
      <h2>{title}</h2>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : todos.length === 0 ? (
        <span>{message}</span>
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
