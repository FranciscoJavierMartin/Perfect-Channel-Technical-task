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

export function createTodo(description: string) {
  return fetch(`${process.env.REACT_APP_API_URL}Task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });
}

export function toggleTodo(id: string) {
  return fetch(`${process.env.REACT_APP_API_URL}Task/${id}`, {
    method: 'PATCH',
  });
}
