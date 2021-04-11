import { Todo } from '../models/todo';

export enum TodoActionName {
  LOAD_TODOS = 'LOAD_TODOS',
}

export interface TodoAction {
  type: TodoActionName;
  payload: {
    completedTodos: Todo[];
    pendingTodos: Todo[];
  };
}

export type DispatchTodo = (action: TodoAction) => void;

export interface TodoState {
  completedTodos: Todo[];
  pendingTodos: Todo[];
}
