# Processo de Entrega e Governança de Versionamento

Este pacote padroniza o processo de desenvolvimento, versionamento semântico, criação de releases e fluxo de aprovação.
Inclui templates e ações automatizadas para o ciclo Alpha, Beta e Release.

![Fluxo GitFlow](./docs/gitflow.png)

## Permissões para Actions criarem e aprovarem Pull Requests

Para que as GitHub Actions possam criar e aprovar pull requests automaticamente, é necessário conceder permissões específicas.

### Como configurar as permissões

#### Na organização

1. Acesse as configurações da organização no GitHub.
2. Vá em **Settings** > **Actions** > **General**.
3. Em **Workflow permissions**, selecione **Allow GitHub Actions to create and approve pull requests**.

#### No repositório

1. Acesse o repositório desejado.
2. Vá em **Settings** > **Actions** > **General**.
3. Em **Workflow permissions**, selecione **Allow GitHub Actions to create and approve pull requests**.

> **Observação:** Essas permissões são essenciais para workflows que automatizam merges, releases ou atualizações de dependências via pull requests.

## Aplicando políticas de proteção de branch

### Aplicando políticas via GitHub CLI

Utilize os arquivos de configuração localizados em `.github/branch-protection-policies/` como payload:

```sh
# Proteção para a branch main
gh api repos/OWNER/REPO/branches/main/protection --method PUT --input .github/branch-protection-policies/branch-protection-main.json

# Proteção para a branch dev
gh api repos/OWNER/REPO/branches/dev/protection --method PUT --input .github/branch-protection-policies/branch-protection-dev.json
```

### Aplicando políticas via GitHub API (curl)

Também é possível aplicar as políticas usando curl e os arquivos JSON:

```sh
# Proteção para a branch main
curl -X PUT -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/branches/main/protection \
  --data-binary @.github/branch-protection-policies/branch-protection-main.json

# Proteção para a branch dev
curl -X PUT -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/branches/dev/protection \
  --data-binary @.github/branch-protection-policies/branch-protection-dev.json
```

## Times sugeridos

Durante a etapa de configuração do repositório, é recomendado criar os seguintes times:

### Criando times via GitHub CLI

Execute os comandos abaixo, substituindo `ORG` pelo nome da sua organização. Para que os times sejam visíveis em toda a organização e utilizáveis em múltiplos repositórios, defina `privacy='closed'` (times secretos não são listados nem aplicáveis em CODEOWNERS de forma ampla):

```sh
gh api orgs/ORG/teams -f name='dev-frontend' -f privacy='closed'
gh api orgs/ORG/teams -f name='dev-backend' -f privacy='closed'
gh api orgs/ORG/teams -f name='dev-seniors' -f privacy='closed'
```

### Criando times via GitHub API (curl)

Substitua `ORG` pelo nome da sua organização e `TOKEN` por um token de acesso com permissão de admin. Use `"privacy": "closed"` para times visíveis na organização:

```sh
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/orgs/ORG/teams \
  -d '{"name": "dev-frontend", "privacy": "closed"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/orgs/ORG/teams \
  -d '{"name": "dev-backend", "privacy": "closed"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/orgs/ORG/teams \
  -d '{"name": "dev-seniors", "privacy": "closed"}'
```

## Labels sugeridas

As labels abaixo tem como objetivo organizar e definir responsáveis de forma automática para as pull requests e issues.

### Labels automáticas utilizadas

As labels abaixo são aplicadas automaticamente conforme o arquivo `.github/labeler.yml`:

```plaintext
frontend
backend
infra
docs
ci
release
```

### Criando labels via GitHub CLI

Execute os comandos abaixo, substituindo `OWNER/REPO` pelo repositório desejado:

```sh
gh label create "frontend" --color "1D76DB" --description "Mudanças no frontend" --repo OWNER/REPO
gh label create "backend" --color "D73A4A" --description "Mudanças no backend" --repo OWNER/REPO
gh label create "infra" --color "5319E7" --description "Infraestrutura" --repo OWNER/REPO
gh label create "docs" --color "0075CA" --description "Documentação" --repo OWNER/REPO
gh label create "ci" --color "A2EEEF" --description "Integração contínua" --repo OWNER/REPO
gh label create "release" --color "FBCA04" --description "Release" --repo OWNER/REPO
```

### Criando labels via GitHub API (curl)

Substitua `OWNER`, `REPO` e `TOKEN` conforme necessário:

```sh
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name": "frontend", "color": "1D76DB", "description": "Mudanças no frontend"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name": "backend", "color": "D73A4A", "description": "Mudanças no backend"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name": "infra", "color": "5319E7", "description": "Infraestrutura"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name": "docs", "color": "0075CA", "description": "Documentação"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name": "ci", "color": "A2EEEF", "description": "Integração contínua"}'
curl -X POST -H "Authorization: Bearer TOKEN" -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name": "release", "color": "FBCA04", "description": "Release"}'
```

## CODEOWNERS

O arquivo `.github/CODEOWNERS` define quem é automaticamente marcado como responsável (reviewer) para mudanças em partes do repositório.

- Localização: `.github/CODEOWNERS`
- Regra global: `*` define owners padrão para todo o repo.
- Regras por diretório: exemplos com `/frontend/**` e `/backend/**` cobrem todas as pastas e arquivos abaixo.
- Owners aceitos: usuários (`@usuario`) ou times da organização (`@ORG/time`).

### Como configurar para sua organização

1. Substitua `ORG` pelo nome da sua organização GitHub.
2. Garanta que os times existam na organização (veja a seção "Times sugeridos").
3. Ajuste as regras conforme sua estrutura de pastas.

Exemplo de conteúdo (substitua `ORG` pelo nome da sua organização):

```plaintext
# Code owners globais
* @ORG/dev-frontend @ORG/dev-backend @ORG/dev-seniors

# Responsáveis específicos por áreas do repo
/frontend/** @ORG/dev-frontend @ORG/dev-seniors
/backend/** @ORG/dev-backend @ORG/dev-seniors
```

### Dicas

- Use `/**` para cobrir recursivamente um diretório.
- Ordem importa: a última regra que casa é a aplicada.
- Se não usar times, substitua por usuários individuais (`@usuario`).
- Depois de atualizar, faça um PR de teste e verifique se os owners são atribuídos automaticamente.

## Automatização via Script (GitHub CLI)

Para evitar executar cada comando manualmente, use o script `scripts/setup-github.sh` que aplica as proteções de branch, cria os times e as labels automaticamente.

- Pré-requisitos: GitHub CLI instalado e autenticado (`gh auth login`).
- Parâmetros: `ORG` (organização), `OWNER` (dono do repo), `REPO` (nome do repo).

### Uso em macOS/Linux (bash)

```sh
chmod +x scripts/setup-github.sh
./scripts/setup-github.sh ORG OWNER REPO
```

### Uso no Windows (PowerShell via Git Bash/WSL)

Se estiver usando Git Bash ou WSL:

```sh
chmod +x scripts/setup-github.sh
./scripts/setup-github.sh ORG OWNER REPO
```

### Exemplos

```sh
./scripts/setup-github.sh minha-org testando-gitflow exemplo
```

O script:

- Aplica proteções usando os arquivos `.github/branch-protection-policies/*.json`.
- Cria os times `dev-frontend`, `dev-backend`, `dev-seniors` na organização informada.
- Cria as labels padrão no repositório `OWNER/REPO` informado.
