Este é uma API construída com Node.js, Typescript, Express, Prisma, Swagger e JWT para gerenciar usuários, projetos, parcerias, financiamentos e recursos educacionais.

Inicialização
Configure seu ambiente criando um arquivo .env (você pode copiar o conteúdo de .env.example e colá-lo no novo arquivo).
Rode o comando npm i.

Certifique-se de que o Docker está em execução e execute npm run setup no terminal.
Para iniciar a aplicação, execute npm run start.

Para acessar a documentação da API, acesse http://localhost:3000/api.
Acessar banco de dados
É possível verificar os dados salvos no banco através do Terminal do container Docker. Acesse o terminal do container "express-todo-list-db-*" e utilize os comandos abaixo:

Rotas
Usuários (Users)
POST /users

Cria um novo usuário.
GET /users

Retorna todos os usuários.
GET /users/id/

Retorna um usuário por ID.
PATCH /users/id/

Atualiza um usuário por ID.
DELETE /users/id/

Deleta um usuário por ID.
Projetos (Projects)
POST /projects

Cria um novo projeto.
GET /projects

Retorna todos os projetos.
GET /projects/id/

Retorna um projeto por ID.
PATCH /projects/id/

Atualiza um projeto por ID.
DELETE /projects/id/

Deleta um projeto por ID.
Parcerias (Partnerships)
POST /partnerships

Cria uma nova parceria.
GET /partnerships

Retorna todas as parcerias.
GET /partnerships/id/

Retorna uma parceria por ID.
DELETE /partnerships/id/

Deleta uma parceria por ID.
Financiamentos (Fundings)
POST /fundings

Cria um novo financiamento.
GET /fundings

Retorna todos os financiamentos.
GET /fundings/id/

Retorna um financiamento por ID.
PATCH /fundings/id/

Atualiza um financiamento por ID.
DELETE /fundings/id/

Deleta um financiamento por ID.
Recursos Educacionais (Educations)
POST /educations

Cria um novo recurso educacional.
GET /educations

Retorna todos os recursos educacionais.
GET /educations/id/

Retorna um recurso educacional por ID.
PATCH /educations/id/

Atualiza um recurso educacional por ID.
DELETE /educations/id/

Deleta um recurso educacional por ID.
