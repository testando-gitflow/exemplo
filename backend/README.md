# Backend TODO API

Este backend utiliza [JSON Server](https://github.com/typicode/json-server) para simular uma API REST para gerenciamento de TODOs.

## Instalação

```bash
npm install -g json-server
```

## Como iniciar o servidor

```bash
json-server --watch db.json --port 3001
```

## Endpoints

- `GET    /todos` - Lista todos os TODOs
- `GET    /todos/:id` - Busca um TODO pelo id
- `POST   /todos` - Cria um novo TODO
- `PUT    /todos/:id` - Atualiza um TODO
- `PATCH  /todos/:id` - Atualiza parcialmente um TODO
- `DELETE /todos/:id` - Remove um TODO

## Exemplo de objeto TODO

```json
{
  "id": "1",
  "title": "Primeiro TODO",
  "completed": false,
  "createdAt": "2025-12-02T12:00:00Z"
}
```

