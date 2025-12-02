export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type CreateTodoDTO = Omit<Todo, 'id' | 'createdAt'>;
