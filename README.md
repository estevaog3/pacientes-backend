# labtecsMobile

## Como executar

### Backend

#### Pré-requisitos

Os seguintes programas devem estar previamente instalados no seu computador:

- [postgresql](https://www.postgresql.org/)
- psql, ou outro cliente do postgresql, mas utilizo este porque já vem instalado junto com o postgresql
- yarn (ou npm)
- node

#### Passo a passo

0. Clone o repositório do projeto

1. Mova para o diretório do backend:

```
cd labtecsMobile/backend
```

##### Configurando o banco de dados de desenvolvimento

2. Inicie o servidor local do postgresql:

```
sudo service postgresql start
```

3. Conecte-se ao postgresql com um usuário que tenha privilégios para criar banco de dados no postgresql. Neste caso estou me conectando como usuário "postgres":

```
sudo -u postgres psql
```

4. No prompt do `psql` que foi aberto, execute as consultas do arquivo setup_bd.sql:

```
\i ./setup_db.sql;
```

5. Saia do psql:

```
\q
```

##### Iniciando o servidor de backend localmente

6. No diretório do backend, instale as dependencias:

```
yarn install
```

ou, com npm:

```
npm install
```

7. Inicie o servidor:

```
yarn start
```

ou, com npm:

```
npm run start
```
