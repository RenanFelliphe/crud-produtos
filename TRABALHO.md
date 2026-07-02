# Trabalho — CRUD de Produtos

## Contexto

Em aula construímos uma base full-stack com:

- **Backend**: Express 5 + TypeScript, autenticação JWT (`login` + middleware `verifyJWT`), Knex + MySQL, rotas com query params (`req.query`) e validação de duplicidade de dados.
- **Frontend**: Next.js (Pages Router), Axios com interceptor que injeta o token JWT automaticamente, formulários controlados com `useState`, Tailwind CSS.

Esse repositório já vem com essa base funcional pronta (autenticação, middleware, conexão com o banco, instância do Axios). Vocês **não precisam recriar nada disso** — apenas reutilizar.

## O exercício

Implementar o **CRUD completo de Produtos**: criar, listar, buscar por id, atualizar e excluir produtos, tanto no backend quanto no frontend.

## 1. Banco de dados

Execute o script `banco/setup_produtos.sql` no banco `desenv_web_rpv` (o mesmo banco usado em aula) para criar a tabela `produtos`:

```sql
CREATE TABLE IF NOT EXISTS produtos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  descricao   TEXT,
  preco       DECIMAL(10,2) NOT NULL,
  quantidade  INT NOT NULL DEFAULT 0,
  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. Rotas do backend a implementar

Arquivo: `backend/src/controllers/productController.ts` (já existe com as assinaturas das 5 funções, vazias — é o seu mapa).

| Método | Rota            | Auth | Descrição                                              |
|--------|-----------------|------|---------------------------------------------------------|
| GET    | `/produtos`     | Não  | Listar todos os produtos. Aceitar `?q=` para buscar por nome |
| GET    | `/produtos/:id` | Não  | Buscar um produto pelo id                                |
| POST   | `/produtos`     | Não  | Criar um novo produto                                    |
| PUT    | `/produtos/:id` | Não  | Atualizar um produto existente                           |
| DELETE | `/produtos/:id` | Não  | Remover um produto                                       |

Vocês vão precisar:
- Registrar essas 5 rotas em `backend/src/index.ts` (importando as funções de `productController.ts`), do mesmo jeito que `/login` e `/perfil` já estão registradas.
- Implementar cada função do controller usando o `db` (Knex) exportado em `backend/src/database/connection.ts` — mesmo padrão usado na rota `/users` de referência.
- Usar `backend/routes.http` (já tem um bloco de exemplo com as 5 chamadas de Produtos) para testar cada rota conforme for implementando.

## 3. Páginas do frontend a implementar

| Página                              | Arquivo                                    | Descrição                                          |
|--------------------------------------|---------------------------------------------|-----------------------------------------------------|
| Listagem de produtos                 | `frontend/src/pages/produtos/index.tsx`     | Busca os produtos ao carregar e exibe em tabela, com botões Editar/Excluir |
| Cadastro de produto                  | `frontend/src/pages/produtos/novo.tsx`      | Formulário controlado que envia `POST /produtos`     |
| Edição de produto                    | `frontend/src/pages/produtos/[id].tsx`      | Formulário que carrega o produto pelo id e envia `PUT /produtos/:id` |

Os três arquivos já existem como scaffold vazio, com comentários `// TODO` indicando onde cada trecho de lógica deve entrar.

## 4. Conceitos novos que vocês vão precisar pesquisar

- **`req.params`**: como o Express expõe partes dinâmicas da URL (ex: `/produtos/:id` → `req.params.id`).
- **`PUT` e `DELETE`**: os verbos HTTP usados para atualizar e remover um recurso.
- **`useEffect`**: hook do React para disparar uma ação (como buscar dados) quando o componente é montado ou quando um valor muda.
- **Rota dinâmica `[id].tsx`**: convenção do Next.js Pages Router para criar páginas cujo caminho depende de um parâmetro (`useRouter().query.id`).

## Padrão de referência

Vocês podem (e devem) olhar para o que já existe no projeto anterior como modelo:

- `backend/src/controllers/authController.ts` → modelo de controller
- `backend/src/middleware/authMiddleware.ts` → middleware JWT (reusar sem reimplementar, se decidirem proteger as rotas de produtos)
- `frontend/src/api/axiosInstance.ts` → instância Axios já configurada (reusar sem modificar)

## Critérios de avaliação

- [ ] Tabela `produtos` criada no banco a partir do script fornecido
- [ ] As 5 rotas do backend implementadas e registradas em `index.ts`
- [ ] `GET /produtos` aceita busca por `?q=`
- [ ] `GET /produtos/:id`, `PUT /produtos/:id` e `DELETE /produtos/:id` retornam 404 quando o produto não existe
- [ ] Página de listagem busca e exibe os produtos reais do banco
- [ ] Página de cadastro cria um produto novo e reflete na listagem
- [ ] Página de edição carrega os dados existentes e salva as alterações
- [ ] Exclusão remove o produto e atualiza a listagem
- [ ] Código organizado, sem `console.log` de debug esquecido

## Regras de entrega

1. Todo o código deve estar commitado neste mesmo repositório.
2. Não é necessário (nem esperado) alterar a lógica de autenticação já existente.
3. Testem cada rota pelo `routes.http` antes de integrar com o frontend.
4. Em caso de dúvida sobre um conceito novo, pesquisem primeiro (documentação oficial do Express e do Next.js) antes de perguntar.
