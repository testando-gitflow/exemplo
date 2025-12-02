import { Todo } from '@/types/todo';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      data-testid={`todo-item-${todo.id}`}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border bg-card transition-all duration-200 animate-fade-in",
        "hover:shadow-md hover:border-primary/20",
        todo.completed && "opacity-60"
      )}
    >
      <Checkbox
        data-testid={`todo-checkbox-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={(checked) => onToggle(todo.id, checked as boolean)}
        className="h-5 w-5"
      />
      <span
        className={cn(
          "flex-1 text-base transition-all",
          todo.completed && "line-through text-muted-foreground"
        )}
      >
        {todo.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        data-testid={`todo-delete-${todo.id}`}
        onClick={() => onDelete(todo.id)}
        className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
