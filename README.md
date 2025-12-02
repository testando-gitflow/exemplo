# Processo de Entrega e Governança de Versionamento

Este pacote padroniza o processo de desenvolvimento, versionamento semântico, criação de releases e fluxo de aprovação.
Inclui templates e ações automatizadas para o ciclo Alpha, Beta e Release.

![Fluxo GitFlow](./docs/gitflow.png)

## Times sugeridos

Durante a etapa de configuração do repositório, é recomendado criar os seguintes times:

- `dev-frontend`
- `dev-backend`
- `dev-seniors`

## Labels sugeridas

As labels abaixo tem como objetivo organizar e definir responsáveis de forma automática para as pull requests e issues.

```plaintext
type:feature
type:bug
type:docs
type:refactor
type:infra
team:dev-frontend
team:dev-backend
team:dev-seniors
status:in-progress
status:blocked
status:review
```
