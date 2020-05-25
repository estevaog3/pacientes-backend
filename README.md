# pacientes-backend

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

1. Mova para o diretório do projeto:

```
cd pacientes-backend
```

##### Configurando o banco de dados de desenvolvimento

2. Inicie o servidor local do postgresql:

```
sudo service postgresql start
```

3. Crie o banco de dados local de desenvolvimento e conecte-se à ele:

```
sudo -u postgres psql -c 'CREATE DATABASE test_db'
```

4. Conecte-se ao postgresql usando o banco de dados criado anteriormente:

```
sudo -u postgres psql -d test_db
```

5. No prompt do `psql` que foi aberto, execute as consultas do arquivo setup_bd.sql:

```
\i ./setup_db.sql;
```

6. Saia do psql:

```
\q
```

##### Iniciando o servidor de backend localmente

7. No diretório do backend, instale as dependencias:

```
yarn install
```

ou, com npm:

```
npm install
```

8. Inicie o servidor:

```
yarn start
```

ou, com npm:

```
npm run start
```

## Como consumir esta API

Para utilizar esta API (ver rotas na seção seguinte), um cliente deve fazer requisições de acordo com o formato aqui especificado.

- Cadastrar paciente pelo CPF:

```
curl -X POST -H 'Content-Type: application/json' 'http://localhost:3333/pacientes/cadastrar/CPF'
```

O `CPF` deve conter apenas números, como este:

```
curl -X POST -H 'Content-Type: application/json' 'http://localhost:3333/pacientes/cadastrar/12948514592'
```

##### Nota: este CPF não existe, substitua com um CPF que exista para realizar um cadastro.

- Listar CPF e nome de todos os pacientes:

```
curl -X GET -H 'Content-Type: application/json' 'http://localhost:3333/pacientes/listar'
```

## Rotas da API

- `/pacientes/cadastrar/CPF`

  1. Consulta CPF no banco de dados. Se existir, retorna todos os dados do paciente
  2. Senão, obtém o nome do paciente a partir do cpf
  3. Inserir paciente com CPF e nome no banco de dados
  4. Retornar JSON com CPF e nome do paciente

- `/pacientes/listar/`
  1. Obter todos os nomes e CPFs dos pacientes no BD
  2. Retornar esses dados como array de JSON
