import { GitBranch, GitMerge, GitPullRequest, GitCommit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const gitflowSteps = [
  {
    icon: GitBranch,
    title: 'Branches',
    description: 'O Gitflow utiliza branches principais (main, develop) e branches de suporte (feature, release, hotfix) para organizar o desenvolvimento.',
  },
  {
    icon: GitCommit,
    title: 'Commits',
    description: 'Cada alteração é registrada em commits atômicos e descritivos, facilitando o rastreamento de mudanças no código.',
  },
  {
    icon: GitPullRequest,
    title: 'Pull Requests',
    description: 'As mudanças são revisadas através de Pull Requests antes de serem integradas, garantindo qualidade do código.',
  },
  {
    icon: GitMerge,
    title: 'Merges',
    description: 'Após aprovação, as branches são mescladas seguindo o fluxo definido, mantendo o histórico organizado.',
  },
];

export function GitflowInfo() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-bold text-foreground">
          Sobre o Gitflow
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Este TODO App foi desenvolvido para demonstrar o fluxo de trabalho Gitflow, 
          um modelo de branching que define uma estrutura rigorosa para gerenciar o 
          desenvolvimento de software em equipe.
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {gitflowSteps.map((step, index) => (
          <Card 
            key={step.title} 
            className="border-border/50 hover:border-primary/30 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent">
                  <step.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {step.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
