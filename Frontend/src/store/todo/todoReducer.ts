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
    default:
      res = state;
  }

  return res;
}
