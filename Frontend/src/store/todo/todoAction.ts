import { getCompletedTodos, getPendingTodos } from '../../network/todos';
import { DispatchTodo, TodoActionName } from './todoTypes';

export default async function loadTodos(dispatch: DispatchTodo) {
  try {
    dispatch({
      type: TodoActionName.INIT_LOADING,
    });
    const [completedTodos, pendingTodos] = await Promise.all([
      getCompletedTodos(),
      getPendingTodos(),
    ]);
    dispatch({
      type: TodoActionName.LOAD_TODOS,
      payload: { completedTodos, pendingTodos },
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({
      type: TodoActionName.INIT_LOADING,
    });
  }
}
