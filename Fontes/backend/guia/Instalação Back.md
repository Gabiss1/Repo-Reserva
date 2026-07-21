Guia de Configuração: Backend MedicApp (NestJS + PostgreSQL)

Agora que o foco mudou para o desenvolvimento do servidor, aqui estão os passos exatos para configurar o ambiente de backend seguindo a stack planejada.

1. Tecnologias Utilizadas
Framework: NestJS (Node.js)
Linguagem: TypeScript
Banco de Dados: PostgreSQL
ORM: TypeORM
Validação: Class-validator & Class-transformer

2. Inicialização do Projeto

Se você ainda não criou a pasta do backend, execute os seguintes comandos no seu terminal:

# 1. Instalar o Nest CLI (se não tiver)
npm i -g @nestjs/cli

# 2. Criar o novo projeto
npx @nestjs/cli new medic-app-backend

Escolha npm como gerenciador de pacotes quando solicitado.


3. Dependências Essenciais

Entre na pasta do projeto e instale as bibliotecas necessárias para a conexão com o banco de dados:

cd medic-app-backend

# TypeORM e Driver do PostgreSQL
npm install --save @nestjs/typeorm typeorm pg

# Validação de dados (DTOs)
npm install --save class-validator class-transformer

# Variáveis de Ambiente
npm install --save @nestjs/config


4. Configuração do Docker (Opcional, mas Recomendado)

Para rodar o PostgreSQL rapidamente sem instalar localmente, crie um arquivo docker-compose.yml na raiz do backend:

version: '3.8'
services:
  db:
    image: postgres
    container_name: medicapp-db
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: medicapp
    ports:
      - "5432:5432"

Comando para rodar: docker-compose up -d


5. Configuração do Banco no NestJS (app.module.ts)

No arquivo src/app.module.ts, configure a conexão inicial:

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user', // O mesmo do Docker/Postgres local
      password: 'password',
      database: 'medicapp',
      autoLoadEntities: true,
      synchronize: true, // Apenas para desenvolvimento!
    }),
  ],
})
export class AppModule {}


Próximo Passo:

Com o ambiente configurado, o próximo passo será criar as Entidades que definimos anteriormente (User, Treatment, Medication) para que o banco de dados gere as tabelas automaticamente.