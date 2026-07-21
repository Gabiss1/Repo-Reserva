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