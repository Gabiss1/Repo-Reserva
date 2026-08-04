import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoseHistory } from "src/entidades/DoseHistory";

@Module({
    imports: [
      TypeOrmModule.forFeature([DoseHistory]),
    ],
    exports: [
      TypeOrmModule,
    ],
  })
  export class DoseHistoryModule {}