import { Todo } from '../models/todo';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${process.env.REACT_APP_API_URL}Task`).then((res) =>
    res.json()
  );
}
