import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (title: string) => void;
  isLoading?: boolean;
}

export function TodoForm({ onSubmit, isLoading }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        data-testid="todo-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Adicionar nova tarefa..."
        className="flex-1 h-12 text-base"
        disabled={isLoading}
      />
      <Button
        type="submit"
        data-testid="add-todo-button"
        disabled={!title.trim() || isLoading}
        className="h-12 px-6"
      >
        <Plus className="w-5 h-5 mr-2" />
        Adicionar
      </Button>
    </form>
  );
}
