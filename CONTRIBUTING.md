# Regras de Contribuição

Este documento define as regras de contribuição e fluxo de desenvolvimento para este repositório.

## Branches principais

- `main` código de produção e releases finais.
- `dev` código em desenvolvimento contínuo.
- `release/*` preparação de versões e homologação.
- `hotfix/*` correções urgentes em produção.

## Branches de trabalho

- `feat/<nome-da-feature>`
- `bugfix/<nome-do-fix>`
- `hotfix/<nome-do-hotfix>`

### Regras globais

1. **Nenhum commit direto** nas branches `main` e `dev`.
2. **Todo merge deve ser feito via Pull Request**.
3. **Squash merge obrigatório**.
4. **Testes e validações automáticas devem passar** antes do merge.
5. **Commits devem seguir Conventional Commits**.

## Fluxo de desenvolvimento

| Origem     | Destino | Ambiente | Tipo de versionamento |
| ---------- | ------- | -------- | --------------------- |
| feat/\*    | dev     | Alpha    | minor                 |
| bugfix/\*  | dev     | Alpha    | patch                 |
| release/\* | main    | Beta     | conforme release      |
| hotfix/\*  | main    | Produção | patch                 |

## Aprovação de Pull Requests

| Tipo           | Aprovadores necessários    |
| -------------- | -------------------------- |
| Feature/Bugfix | 1 revisor técnico          |
| Release        | 2 revisores (Tech + QA/PM) |
| Hotfix         | 1 revisor sênior           |

## Versionamento

Este repositório utiliza **SemVer**:

- **MAJOR** mudanças incompatíveis
- **MINOR** novas funcionalidades
- **PATCH** correções

Versões geradas automaticamente via GitHub Action `release-please`:

- Merge em `dev` = `vX.X.X-alpha.N`
- Merge `release/*` em `main` = `vX.X.X-beta.N`
- Release final = `vX.X.X`

## Commits Convention

Exemplos recomendados:

```plain
feat: adicionado módulo de upload
fix: corrigido timeout na página de listagem de usuários
perf: melhoria no tem de carregamento
refactor: renomeado o controller de usuários
docs: readme atualizado
test: adicionados testes para o módulo de usuário
BREAKING CHANGE: alteração no sistema de autorização
```

## Checklist para PR

- [ ] Testes aplicáveis criados/ajustados
- [ ] Documentação atualizada quando necessário
- [ ] Descrição clara do escopo e impacto
