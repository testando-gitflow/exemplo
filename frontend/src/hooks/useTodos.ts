import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '@/services/todoApi';
import { CreateTodoDTO, Todo } from '@/types/todo';
import { toast } from '@/hooks/use-toast';

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTodoDTO) => todoApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({ title: 'Todo criado com sucesso!' });
    },
    onError: () => {
      toast({ title: 'Erro ao criar todo', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      todoApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      toast({ title: 'Erro ao atualizar todo', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => todoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast({ title: 'Todo removido!' });
    },
    onError: () => {
      toast({ title: 'Erro ao remover todo', variant: 'destructive' });
    },
  });

  return {
    todos: todosQuery.data ?? [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    createTodo: createMutation.mutate,
    updateTodo: updateMutation.mutate,
    deleteTodo: deleteMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
