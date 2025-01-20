# InvenTech API

Esta aplicação é uma API que permite a criação de usuários, produtos e gerenciamento de estoque. Ela também oferece autenticação baseada em JWT para usuários logados e permite o upload de imagens para os produtos, que são armazenadas como dados binários no banco de dados.

## Funcionalidades

### CRUD de Produtos:
- Criar, ler, atualizar e excluir produtos.
- A criação de um produto também cria automaticamente um item de estoque associado.

### Gerenciamento de Estoque:
- Atualizar a quantidade do produto em estoque.

### Autenticação de Usuários:
- Registro de novos usuários.
- Autenticação JWT para proteger endpoints de criação de produtos e manipulação de estoque.

### Upload de Imagens de Produtos:
- Envio de imagens em formato binário (BLOB) que são armazenadas no banco de dados junto com o produto.

---

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- JWT (JSON Web Tokens)
- Multer (para upload de arquivos)
- MySQL (banco de dados)

--

## Observações 

- É necessário configurar um arquivo .env para as variáveis de configuração do banco, e uma JWT_SECRET para para não encontrar erros ao iniciar o projeto
-É preciso rodar o script do aquivo .sql em seu MySQL para rodar funcionar a API
