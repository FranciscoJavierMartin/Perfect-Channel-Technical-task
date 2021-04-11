import React, { useReducer } from 'react';
import todoReducer from './todoReducer';
import { DispatchTodo, TodoAction, TodoState } from './todoTypes';

const TodoContext = React.createContext<{
  state: TodoState;
  dispatch: DispatchTodo;
}>({
  state: { completedTodos: [], pendingTodos: [], isLoading: false, },
  dispatch: (action: TodoAction) => {},
});

export function useTodoContext(){
  return React.useContext(TodoContext);
}

const TodoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    completedTodos: [],
    pendingTodos: [],
    isLoading: false,
  });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
