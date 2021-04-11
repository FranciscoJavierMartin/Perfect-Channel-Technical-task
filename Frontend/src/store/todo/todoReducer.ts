import { TodoAction, TodoActionName, TodoState } from './todoTypes';

export default function todoReducer(
  state: TodoState,
  action: TodoAction
): TodoState {
  let res: TodoState;

  switch (action.type) {
    case TodoActionName.LOAD_TODOS:
      res = {
        ...state,
        pendingTodos: action.payload.pendingTodos,
        completedTodos: action.payload.completedTodos,
      };
      break;
    case TodoActionName.INIT_LOADING:
      res = {
        ...state,
        isLoading: true,
      };
      break;
    case TodoActionName.FINISH_LOADING:
      res = {
        ...state,
        isLoading: false,
      };
      break;
    default:
      res = state;
  }

  return res;
}
