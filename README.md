# NLW Agents 🚀

Projeto desenvolvido durante o evento **NLW** da Rocketseat. 🧑‍💻

## Descrição

O NLW Agents é um backend em Node.js com Fastify e Drizzle ORM, que expõe rotas HTTP para manipulação de dados de salas (rooms) em um banco PostgreSQL. O projeto utiliza validação de dados com Zod, organização modular e segue boas práticas de desenvolvimento.

## 🛠️ Tecnologias e Bibliotecas Utilizadas

- **Node.js** + **TypeScript**
- **Fastify** ⚡: Framework web para Node.js, focado em performance.
- **Zod** 🛡️: Validação de dados e tipagem.
- **Drizzle ORM** 🌧️: ORM para integração com banco de dados PostgreSQL.
- **PostgreSQL** 🐘: Banco de dados relacional.
- **Docker** 🐳: Para facilitar o setup do banco de dados.
- **@fastify/cors**: Middleware para CORS.
- **fastify-type-provider-zod**: Integração de validação Zod com Fastify.
- **Biome** 🧬: Linter e formatter para o código.

## 🧩 Padrões de Projeto

- **Organização por responsabilidade**: Separação clara entre rotas HTTP (`src/http/routes`), conexão e schema do banco (`src/db`), e configuração de ambiente (`src/env.ts`).
- **Validação centralizada**: Uso do Zod para validação de dados e schemas.
- **ORM**: Utilização do Drizzle ORM para abstração do acesso ao banco de dados.
- **Configuração por ambiente**: Uso de variáveis de ambiente para dados sensíveis e configuração.

## 📁 Estrutura de Pastas

```
server/
├── src/
│   ├── db/                # Conexão, schema e seeds do banco
│   │   ├── connection.ts
│   │   ├── schema/
│   │   └── seed.ts
│   ├── http/
│   │   └── routes/        # Rotas HTTP
│   ├── env.ts             # Configuração de variáveis de ambiente
│   └── server.ts          # Inicialização do servidor
├── docker/                # Scripts de setup do banco
├── docker-compose.yml     # Orquestração do banco com Docker
├── drizzle.config.ts      # Configuração do Drizzle ORM
└── README.md
```

## 🚦 Setup do Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd server
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

### 4. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 5. Rode as migrations e seeds (se necessário)

```bash
# Ajuste conforme scripts disponíveis
npm run db:seed
```

### 6. Inicie o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

## 📚 Exemplos de Uso das Rotas

### Health Check

```
GET /health
```
Resposta: `OK` ✅

### Listar Salas

```
GET /rooms
```
Resposta:
```json
[
  {
    "id": 1,
    "name": "Sala 1"
  },
  ...
]
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

Projeto criado para fins educacionais durante o evento NLW da Rocketseat. 🚀