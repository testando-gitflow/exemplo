import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "@/services/todoApi";
import { CreateTodoDTO, Todo } from "@/types/todo";
import { toast } from "@/hooks/use-toast";

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: todoApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTodoDTO) => todoApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({ title: "Todo criado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao criar todo", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      todoApi.update(id, data),
    // Optimistic update so UI reflects changes immediately
    onMutate: async ({ id, data }: { id: string; data: Partial<Todo> }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) ?? [];

      queryClient.setQueryData<Todo[]>(["todos"], (prev = []) =>
        prev.map((t) => (String(t.id) === String(id) ? { ...t, ...data } : t))
      );

      return { previousTodos } as { previousTodos: Todo[] };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
      toast({ title: "Erro ao atualizar todo", variant: "destructive" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => todoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast({ title: "Todo removido!" });
    },
    onError: () => {
      toast({ title: "Erro ao remover todo", variant: "destructive" });
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
