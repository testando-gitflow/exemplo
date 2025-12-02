import { Todo, CreateTodoDTO } from '@/types/todo';

const API_URL = 'http://localhost:3001/todos';

export const todoApi = {
  async getAll(): Promise<Todo[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Falha ao buscar todos');
    return response.json();
  },

  async create(data: CreateTodoDTO): Promise<Todo> {
    const todo: Omit<Todo, 'id'> = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    
    if (!response.ok) throw new Error('Falha ao criar todo');
    return response.json();
  },

  async update(id: string, data: Partial<Todo>): Promise<Todo> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) throw new Error('Falha ao atualizar todo');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Falha ao deletar todo');
  },
};
