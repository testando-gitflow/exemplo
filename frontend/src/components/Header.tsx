import { CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center space-y-4 pb-8 border-b border-border">
      <div className="flex items-center justify-center gap-3">
        <div className="p-3 rounded-xl bg-primary">
          <CheckSquare className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          TODO App
        </h1>
      </div>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Aplicação de demonstração do fluxo de trabalho Gitflow com React, 
        TypeScript e testes E2E.
      </p>
    </header>
  );
}
