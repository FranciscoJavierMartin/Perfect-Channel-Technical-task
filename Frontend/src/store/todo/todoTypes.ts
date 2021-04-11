import { Todo } from '../../models/todo';

export enum TodoActionName {
  LOAD_TODOS = 'LOAD_TODOS',
  INIT_LOADING = 'INIT_LOADING',
  FINISH_LOADING = 'FINISH_LOADING',
}

export type TodoAction =
  | {
      type: TodoActionName.LOAD_TODOS;
      payload: {
        completedTodos: Todo[];
        pendingTodos: Todo[];
      };
    }
  | {
      type: TodoActionName.INIT_LOADING;
    }
  | {
      type: TodoActionName.FINISH_LOADING;
    };

export type DispatchTodo = (action: TodoAction) => void;

export interface TodoState {
  completedTodos: Todo[];
  pendingTodos: Todo[];
  isLoading: boolean;
}
