import { Todo } from '../models/todo';

function getTodos(isCompleted: boolean): Promise<Todo[]> {
  return fetch(
    `${process.env.REACT_APP_API_URL}Task/filtered?isCompleted=${isCompleted}`
  ).then((res) => res.json());
}

export function getCompletedTodos(): Promise<Todo[]> {
  return getTodos(true);
}

export function getPendingTodos(): Promise<Todo[]> {
  return getTodos(false);
}
