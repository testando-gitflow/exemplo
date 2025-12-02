import { Header } from '@/components/Header';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { GitflowInfo } from '@/components/GitflowInfo';
import { useTodos } from '@/hooks/useTodos';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

const Index = () => {
  const { todos, isLoading, isError, createTodo, updateTodo, deleteTodo, isCreating } = useTodos();

  const handleCreate = (title: string) => {
    createTodo({ title, completed: false });
  };

  const handleToggle = (id: string, completed: boolean) => {
    updateTodo({ id, data: { completed } });
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-12 px-4 space-y-10">
        <Header />
        
        <main className="space-y-8">
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              Minhas Tarefas
            </h2>
            
            <TodoForm onSubmit={handleCreate} isLoading={isCreating} />
            
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <p>Erro ao carregar tarefas. Verifique se o JSON Server está rodando.</p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
            
            {!isLoading && !isError && todos.length > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                {todos.filter(t => t.completed).length} de {todos.length} tarefas concluídas
              </p>
            )}
          </section>
          
          <GitflowInfo />
        </main>
        
        <footer className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p>
            Desenvolvido para demonstrar Gitflow • 
            <span className="text-primary font-medium"> React + TypeScript + Playwright</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
