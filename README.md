# Processo de Entrega e Governança de Versionamento

Este pacote padroniza o processo de desenvolvimento, versionamento semântico, criação de releases e fluxo de aprovação.
Inclui templates e ações automatizadas para o ciclo Alpha, Beta e Release.

![Fluxo GitFlow](./docs/gitflow.png)

## Aplicando políticas de proteção de branch

### Aplicando políticas via GitHub CLI

Utilize os arquivos de configuração localizados em `.github/branch-protection-policies/` como payload:

```sh
# Proteção para a branch main
gh api repos/OWNER/REPO/branches/main/protection --method PUT -f body@.github/branch-protection-policies/branch-protection-main.json

# Proteção para a branch dev
gh api repos/OWNER/REPO/branches/dev/protection --method PUT -f body@.github/branch-protection-policies/branch-protection-dev.json
```

### Aplicando políticas via GitHub API (curl)

Também é possível aplicar as políticas usando curl e os arquivos JSON:

```sh
# Proteção para a branch main
curl -X PUT -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/branches/main/protection \
	-d @.github/branch-protection-policies/branch-protection-main.json

# Proteção para a branch dev
curl -X PUT -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/branches/dev/protection \
	-d @.github/branch-protection-policies/branch-protection-dev.json
```

## Times sugeridos

Durante a etapa de configuração do repositório, é recomendado criar os seguintes times:

### Criando times via GitHub CLI

Execute os comandos abaixo, substituindo `ORG` pelo nome da sua organização:

```sh
gh api orgs/ORG/teams -f name='dev-frontend'
gh api orgs/ORG/teams -f name='dev-backend'
gh api orgs/ORG/teams -f name='dev-seniors'
```

### Criando times via GitHub API (curl)

Substitua `ORG` pelo nome da sua organização e `TOKEN` por um token de acesso com permissão de admin:

```sh
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/orgs/ORG/teams \
	-d '{"name": "dev-frontend"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/orgs/ORG/teams \
	-d '{"name": "dev-backend"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/orgs/ORG/teams \
	-d '{"name": "dev-seniors"}'
```

## Labels sugeridas

As labels abaixo tem como objetivo organizar e definir responsáveis de forma automática para as pull requests e issues.

### Criando labels via GitHub CLI

Execute os comandos abaixo, substituindo `OWNER/REPO` pelo repositório desejado:

```sh
gh label create "type:feature" --color "1D76DB" --description "Nova funcionalidade" --repo OWNER/REPO
gh label create "type:bug" --color "D73A4A" --description "Correção de bug" --repo OWNER/REPO
gh label create "type:docs" --color "0075CA" --description "Documentação" --repo OWNER/REPO
gh label create "type:refactor" --color "A2EEEF" --description "Refatoração" --repo OWNER/REPO
gh label create "type:infra" --color "BFDADC" --description "Infraestrutura" --repo OWNER/REPO
gh label create "team:dev-frontend" --color "C2E0C6" --description "Time Frontend" --repo OWNER/REPO
gh label create "team:dev-backend" --color "E99695" --description "Time Backend" --repo OWNER/REPO
gh label create "team:dev-seniors" --color "F9D0C4" --description "Time Seniors" --repo OWNER/REPO
gh label create "status:in-progress" --color "FBCA04" --description "Em progresso" --repo OWNER/REPO
gh label create "status:blocked" --color "B60205" --description "Bloqueado" --repo OWNER/REPO
gh label create "status:review" --color "D4C5F9" --description "Em revisão" --repo OWNER/REPO
```

### Criando labels via GitHub API (curl)

Substitua `OWNER`, `REPO` e `TOKEN` conforme necessário:

```sh
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "type:feature", "color": "1D76DB", "description": "Nova funcionalidade"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "type:bug", "color": "D73A4A", "description": "Correção de bug"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "type:docs", "color": "0075CA", "description": "Documentação"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "type:refactor", "color": "A2EEEF", "description": "Refatoração"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "type:infra", "color": "BFDADC", "description": "Infraestrutura"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "team:dev-frontend", "color": "C2E0C6", "description": "Time Frontend"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "team:dev-backend", "color": "E99695", "description": "Time Backend"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "team:dev-seniors", "color": "F9D0C4", "description": "Time Seniors"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "status:in-progress", "color": "FBCA04", "description": "Em progresso"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "status:blocked", "color": "B60205", "description": "Bloqueado"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
	https://api.github.com/repos/OWNER/REPO/labels \
	-d '{"name": "status:review", "color": "D4C5F9", "description": "Em revisão"}'
```
